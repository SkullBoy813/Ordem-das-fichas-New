const Ritual = require('../models/Ritual.js');

//listar rituais

exports.listarRituais = async (req, res) => {
    try {
      const rituais = await Ritual.find().sort({ circulo: 1, nome: 1 });
      res.json(rituais);
    } catch (err) {
      console.error('Erro ao listar rituais:', err);
      res.status(500).json({ erro: 'Erro ao buscar rituais', detalhes: err.message });
    }
  };
  
//Criar rituais

  exports.criarRitual = async (req, res) => {
    try {
      const { nome, circulo, elemento } = req.body;

      if (!nome || !circulo || !elemento) {
        return res.status(400).json({ erro: 'Nome, círculo e elemento são obrigatórios' });
      }

      const ritual = await Ritual.create(req.body);
      res.status(201).json(ritual);
    } catch (err) {
      console.error('Erro ao criar ritual:', err);
      res.status(500).json({ erro: 'Erro ao criar ritual', detalhes: err.message });
    }
  };