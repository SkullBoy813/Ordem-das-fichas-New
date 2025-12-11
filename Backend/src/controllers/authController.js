const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//registro
exports.register = async (req, res, next) => {
    try {
        const {username , email, password} = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        
        const userExists = await User.findOne({email});
        if (userExists) 
            return res.status(400).json({ error: 'Usuario já existente.'})
        
        const user = await User.create({ username, email, password});

        res.status(201).json({message: 'Usuario criado com sucesso!'})
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }
        next(err);
    }
};

//login
exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }
  
      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ error: 'Credenciais inválidas' });
  
      const passwordOk = await bcryptjs.compare(password, user.password);
      if (!passwordOk)
        return res.status(401).json({ error: 'Credenciais inválidas' });
  
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.json({ token });
    } catch (err) {
      next(err);
    }
  };
