const Habilidade = require('../models/Habilidade');

// Listar as habilidades

exports.listarHabilidades = async (req, res) => {
  try {
    const habilidades = await Habilidade.find().sort({ nome: 1 });
    res.json(habilidades);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar habilidades' });
  }
};

// Criar as habilidades

exports.criarHabilidade = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    const habilidade = await Habilidade.create({ nome, descricao });
    res.status(201).json(habilidade);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar habilidade' });
  }
};