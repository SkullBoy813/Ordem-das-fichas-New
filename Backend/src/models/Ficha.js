const mongoose = require('mongoose');

const FichaSchema = new mongoose.Schema({

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // TOPO DA FICHA
  nome: String,
  classe: String,
  origem: String,
  trilha: String,
  patente: String,

  // Atributos
  atributos: {
    forca: { type: Number, default: 0 },
    agilidade: { type: Number, default: 0 },
    vigor: { type: Number, default: 0 },
    inteligencia: { type: Number, default: 0 },
    presenca: { type: Number, default: 0 },

    
    vida: { type: Number, default: 0 },
    sanidade: { type: Number, default: 0 },
    defesa: { type: Number, default: 0 },
    bloqueio: { type: Number, default: 0 },
    esquiva: { type: Number, default: 0 }
  },

  // PERÍCIAS
  pericias: [{
    nome: String,
    valor: Number,
    modificador: Number
  }],

  // HABILIDADES E RITUAIS
  habilidades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habilidade' }],
  rituais: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ritual' }],

  // COMBATE (SOMENTE VALORES VARIÁVEIS)
  combate: {
    vida_atual: { type: Number, default: 0 },
    sanidade_atual: { type: Number, default: 0 }
  }

}, { timestamps: true });

module.exports = mongoose.model('Ficha', FichaSchema);