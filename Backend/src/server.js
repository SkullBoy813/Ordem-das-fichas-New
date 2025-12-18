require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// Configuração CORS mais permissiva para desenvolvimento
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Middleware de log para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas de teste
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor ativo!', timestamp: new Date().toISOString() });
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