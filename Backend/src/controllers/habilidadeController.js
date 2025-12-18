const Habilidade = require('../models/Habilidade');

// Listar as habilidades

exports.listarHabilidades = async (req, res) => {
  try {
    const habilidades = await Habilidade.find().sort({ nome: 1 });
    res.json(habilidades);
  } catch (err) {
    console.error('Erro ao listar habilidades:', err);
    res.status(500).json({ erro: 'Erro ao buscar habilidades', detalhes: err.message });
  }
};

// Criar as habilidades

exports.criarHabilidade = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const habilidade = await Habilidade.create({ nome, descricao });
    res.status(201).json(habilidade);
  } catch (err) {
    console.error('Erro ao criar habilidade:', err);
    res.status(500).json({ erro: 'Erro ao criar habilidade', detalhes: err.message });
  }
};