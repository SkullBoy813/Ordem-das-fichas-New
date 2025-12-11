const mongoose = require('mongoose');

//Modelo Rituais

const RitualSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  circulo: { type: Number, min: 1, max: 4, required: true },
  elemento: {
    type: String,
    enum: ['Conhecimento', 'Energia', 'Morte', 'Sangue'],
    required: true
  },
  execucao:String,
  alcance: String,
  alvo: String,
  descricao: String
}, { timestamps: true });

//export

module.exports = mongoose.model('Ritual', RitualSchema);
