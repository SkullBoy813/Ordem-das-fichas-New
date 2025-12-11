const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

//Conexão com suas ações

router.post('/register', controller.register);
router.post('/login', controller.login);

//export

module.exports = router;