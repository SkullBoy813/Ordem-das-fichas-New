const express = require('express');
const router = express.Router();
const controller = require('../controllers/habilidadeController.js');
const auth = require('../middlewares/authMiddleware.js');

//Conexão com suas ações

router.get('/', auth, controller.listarHabilidades);
router.post('/', auth, controller.criarHabilidade);

//export

module.exports = router;