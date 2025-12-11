const mongoose = require("mongoose");
require("dotenv").config();


// Conexão com o MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado!");
  } catch (error) {
    console.error("❌ Erro no MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;