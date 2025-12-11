require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json()); 

// Rotas de teste
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor ativo!' });
});

// Importar e usar rotas 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/fichas', require('./routes/fichaRoutes'));
app.use('/api/habilidades', require('./routes/habilidadeRoutes.js')); 
app.use('/api/rituais', require('./routes/ritualRoutes.js')); 

// Middleware de tratamento de erro simples
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro iniciando o servidor:', err);
    process.exit(1);
  });