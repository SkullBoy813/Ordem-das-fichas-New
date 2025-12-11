const Ritual = require('../models/Ritual.js');

//listar rituais

exports.listarRituais = async (req, res) => {
    try {
      const rituais = await Ritual.find().sort({ circulo: 1 });
      res.json(rituais);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar rituais' });
    }
  };
  
//Criar rituais

  exports.criarRitual = async (req, res) => {
    try {
      const ritual = await Ritual.create(req.body);
      res.status(201).json(ritual);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar ritual' });
    }
  };