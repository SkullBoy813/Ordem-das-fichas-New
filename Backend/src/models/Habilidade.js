const mongoose = require('mongoose');

//Modelo Habilidade
const HabilidadeSchema = new mongoose.Schema({ 
    nome: {type: String, required: true},
    descricao: {type: String, required: true}
}, {timestamps: true});

//export
module.exports = mongoose.model('Habilidade', HabilidadeSchema);