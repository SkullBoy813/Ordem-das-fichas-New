const Ficha = require('../models/Ficha.js');
const Habilidade = require('../models/Habilidade.js');
const Ritual = require('../models/Ritual.js')

//Criar Ficha

exports.criarFicha = async (req, res) => {
  try {
    console.log('Dados recebidos para criar ficha:', req.body);
    console.log('User ID:', req.user.id);

    // Limpar campos que não devem ser enviados pelo cliente
    const dadosFicha = { ...req.body };
    delete dadosFicha._id; // Remover _id se existir
    delete dadosFicha.owner; // Não permitir que o cliente defina o owner

    const ficha = await Ficha.create({
      ...dadosFicha,
      owner: req.user.id // vem do middleware JWT
    });

    console.log('Ficha criada:', ficha._id);

    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(ficha._id)
      .populate('habilidades')
      .populate('rituais');

    res.status(201).json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao criar ficha:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message, detalhes: err.errors });
    }
    res.status(500).json({ error: err.message || 'Erro ao criar ficha' });
  }
};

//Listar ficha do usuario

exports.listarFichas = async (req, res) => {
  try {
    const fichas = await Ficha.find({ owner: req.user.id })
      .populate('habilidades')
      .populate('rituais')
      .sort({ createdAt: -1 }); // Mais recentes primeiro

    res.json(fichas);
  } catch (err) {
    console.error('Erro ao listar fichas:', err);
    res.status(500).json({ error: err.message });
  }
};

//Buscar Ficha por ID
exports.buscarFicha = async (req, res) => {
  try {
    const ficha = await Ficha.findOne({
      _id: req.params.id,
      owner: req.user.id
    })
      .populate('habilidades')
      .populate('rituais');

    if (!ficha)
      return res.status(404).json({ error: 'Ficha não encontrada' });

    res.json(ficha);
  } catch (err) {
    console.error('Erro ao buscar ficha:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: err.message });
  }
};

//Atualizar Ficha

exports.atualizarFicha = async (req, res) => {
  try {
    console.log('Dados recebidos para atualizar ficha:', req.params.id, req.body);
    console.log('User ID:', req.user.id);

    // Limpar campos que não devem ser atualizados pelo cliente
    const dadosAtualizacao = { ...req.body };
    delete dadosAtualizacao._id;
    delete dadosAtualizacao.owner;
    delete dadosAtualizacao.createdAt;
    delete dadosAtualizacao.updatedAt;

    const ficha = await Ficha.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      dadosAtualizacao,
      { new: true, runValidators: true }
    )
      .populate('habilidades')
      .populate('rituais');

    if (!ficha)
      return res.status(404).json({ error: 'Ficha não encontrada' });

    console.log('Ficha atualizada:', ficha._id);
    res.json(ficha);
  } catch (err) {
    console.error('Erro ao atualizar ficha:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message, detalhes: err.errors });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: err.message || 'Erro ao atualizar ficha' });
  }
};

//Deletar Ficha

exports.deletarFicha = async (req, res) => {
  try {
    const ficha = await Ficha.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!ficha)
      return res.status(404).json({ error: 'Ficha não encontrada' });

    res.json({ message: 'Ficha deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar ficha:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'ID inválido' });
    }
    res.status(500).json({ error: err.message });
  }
};

//Atualizar Combate (Sanidade, Vida e PE)

exports.atualizarCombate = async (req, res) => {
  try {
    const { vida_atual, sanidade_atual, pe_atual } = req.body;

    const ficha = await Ficha.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!ficha)
      return res.status(404).json({ error: 'Ficha não encontrada' });

    if (vida_atual !== undefined)
      ficha.combate.vida_atual = vida_atual;

    if (sanidade_atual !== undefined)
      ficha.combate.sanidade_atual = sanidade_atual;

    if (pe_atual !== undefined)
      ficha.combate.pe_atual = pe_atual;

    await ficha.save();

    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(ficha._id)
      .populate('habilidades')
      .populate('rituais');

    res.json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao atualizar combate:', err);
    res.status(500).json({ error: err.message });
  }
};

//Adicionar e listar habilidade

exports.adicionarHabilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const {habilidadeId} = req.body;

    const ficha = await Ficha.findOne({_id: id, owner: req.user.id});
    if(!ficha) {
      return res.status(404).json({ erro: 'Ficha não encontrada'});
    }
  
    const habilidade = await Habilidade.findById( habilidadeId );
    if(!habilidade) {
      return res.status(404).json({ erro: 'Habilidade não encontrada'});
    }

    // Verificar se já existe (comparando como string)
    const habilidadeJaExiste = ficha.habilidades.some(
      h => h.toString() === habilidadeId.toString()
    );
    
    if (habilidadeJaExiste) {
      return res.status(400).json({ erro: 'Habilidade já adicionada' });
    }

    ficha.habilidades.push(habilidadeId);
    await ficha.save();

    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(id)
      .populate('habilidades')
      .populate('rituais');

    res.json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao adicionar habilidade:', err);
    res.status(500).json({ erro: 'Erro ao adicionar Habilidade', detalhes: err.message });
  }
};

//Adicionar e listar ritual

exports.adicionarRitual = async (req, res) => {
  try {
    const { id } = req.params;
    const { ritualId } = req.body;

    const ficha = await Ficha.findOne({_id: id, owner: req.user.id});
    if(!ficha) {
      return res.status(404).json({ erro: 'Ficha não encontrada'});
    }
  
    const ritual = await Ritual.findById(ritualId);
    if(!ritual) {
      return res.status(404).json({ erro: 'Ritual não encontrada'});
    }

    // Verificar se já existe (comparando como string)
    const ritualJaExiste = ficha.rituais.some(
      r => r.toString() === ritualId.toString()
    );
    
    if (ritualJaExiste) {
      return res.status(400).json({ erro: 'Ritual já adicionada' });
    }

    ficha.rituais.push(ritualId);
    await ficha.save();

    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(id)
      .populate('habilidades')
      .populate('rituais');

    res.json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao adicionar ritual:', err);
    res.status(500).json({ erro: 'Erro ao adicionar Ritual', detalhes: err.message });
  }
};

//Remover Ritual e Habilidade

exports.removerHabilidade = async (req, res) => {
  try {
    const { id, habilidadeId } = req.params;

    const ficha = await Ficha.findOne({ _id: id, owner: req.user.id });
    if (!ficha) return res.status(404).json({ erro: 'Ficha não encontrada' });

    ficha.habilidades = ficha.habilidades.filter(
      h => h.toString() !== habilidadeId.toString()
    );

    await ficha.save();
    
    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(id)
      .populate('habilidades')
      .populate('rituais');
    
    res.json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao remover habilidade:', err);
    res.status(500).json({ erro: 'Erro ao remover habilidade', detalhes: err.message });
  }
};

exports.removerRitual = async (req, res) => {
  try {
    const { id, ritualId } = req.params;

    const ficha = await Ficha.findOne({ _id: id, owner: req.user.id });
    if (!ficha) return res.status(404).json({ erro: 'Ficha não encontrada' });

    ficha.rituais = ficha.rituais.filter(
      r => r.toString() !== ritualId.toString()
    );

    await ficha.save();
    
    // Popular antes de retornar
    const fichaPopulada = await Ficha.findById(id)
      .populate('habilidades')
      .populate('rituais');
    
    res.json(fichaPopulada);
  } catch (err) {
    console.error('Erro ao remover ritual:', err);
    res.status(500).json({ erro: 'Erro ao remover ritual', detalhes: err.message });
  }
};



