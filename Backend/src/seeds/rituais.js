const mongoose = require('mongoose');
const Ritual = require('../models/Ritual');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

async function seedRituais() {
  await Ritual.deleteMany();

  await Ritual.insertMany([
    {
      nome: 'Cinerária',
      circulo: 1,
      elemento: 'Energia',
      execucao: 'Ação padrão',
      alcance: 'Curto',
      alvo: 'Área',
      descricao: 'Cria uma nuvem de cinzas místicas.'
    },
    {
      nome: 'Espirais da Morte',
      circulo: 2,
      elemento: 'Morte',
      execucao: 'Ação padrão',
      alcance: 'Médio',
      alvo: 'Criaturas',
      descricao: 'Espirais espectrais drenam a vitalidade.'
    }
  ]);

  console.log('Rituais inseridos com sucesso!');
  process.exit();
}

seedRituais();