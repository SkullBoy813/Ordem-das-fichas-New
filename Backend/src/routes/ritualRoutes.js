const express = require('express');
const router = express.Router();
const controller = require('../controllers/ritualController.js');
const auth = require('../middlewares/authMiddleware.js');

//Conexão com suas ações

router.get('/', auth, controller.listarRituais);

//export

module.exports = router;