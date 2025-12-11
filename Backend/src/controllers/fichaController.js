const Ficha = require('../models/Ficha.js');
const Habilidade = require('../models/Habilidade.js');
const Ritual = require('../models/Ritual.js')

//Criar Ficha

exports.criarFicha = async (req, res) => {
  try {
    const ficha = await Ficha.create({
      ...req.body,
      owner: req.user.id // vem do middleware JWT
    });

    res.status(201).json(ficha);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Listar ficha do usuario

exports.listarFichas = async (req, res) => {
  try {
    const fichas = await Ficha.find({ owner: req.user.id })
      .populate('habilidades')
      .populate('rituais');

    res.json(fichas);
  } catch (err) {
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
    res.status(500).json({ error: err.message });
  }
};

//Atualizar Ficha

exports.atualizarFicha = async (req, res) => {
  try {
    const ficha = await Ficha.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    )
      .populate('habilidades')
      .populate('rituais');

    if (!ficha)
      return res.status(404).json({ error: 'Ficha não encontrada' });

    res.json(ficha);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

//Atualizar Combate (Sanidade, Vida e PE)

exports.atualizarCombate = async (req, res) => {
  try {
    const { vida_atual, sanidade_atual } = req.body;

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

    await ficha.save();

    res.json(ficha);
  } catch (err) {
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

    if (ficha.habilidades.inclue(habilidadeId)) {
      return res.status(400).json({ erro: 'Habilidade já adicionada' });
    }

    ficha.habilidades.push(habilidadeId);
    await ficha.save();

    res.json(ficha);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar Habilidade'});
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

    if (ficha.rituais.inclue(ritualId)) {
      return res.status(400).json({ erro: 'Ritual já adicionada' });
    }

    ficha.rituais.push(ritualId);
    await ficha.save();

    res.json(ficha);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar Ritual'});
  }
};

//Remover Ritual e Habilidade

exports.removerHabilidade = async (req, res) => {
  const { id, habilidadeId } = req.params;

  const ficha = await Ficha.findOne({ _id: id, owner: req.user.id });
  if (!ficha) return res.status(404).json({ erro: 'Ficha não encontrada' });

  ficha.habilidades = ficha.habilidades.filter(
    h => h.toString() !== habilidadeId
  );

  await ficha.save();
  res.json(ficha);
};

exports.removerRitual = async (req, res) => {
  const { id, ritualId } = req.params;

  const ficha = await Ficha.findOne({ _id: id, owner: req.user.id });
  if (!ficha) return res.status(404).json({ erro: 'Ficha não encontrada' });

  ficha.rituais = ficha.rituais.filter(
    r => r.toString() !== ritualId
  );

  await ficha.save();
  res.json(ficha);
};



