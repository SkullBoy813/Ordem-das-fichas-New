const mongoose = require("mongoose");
require("dotenv").config();

// Validação da variável de ambiente
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI não definido. Defina no .env (ou como variável secreta no deploy).");
  process.exit(1);
}

// Conexão com o MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB conectado!");
  } catch (error) {
    console.error("❌ Erro no MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;