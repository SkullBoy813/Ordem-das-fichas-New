const express = require('express');
const router = express.Router();
const controller = require('../controllers/fichaController');
const auth = require('../middlewares/authMiddleware.js');

// comandos gerais

router.post('/', auth, controller.criarFicha);
router.get('/', auth, controller.listarFichas);
router.get('/:id', auth, controller.buscarFicha);
router.put('/:id', auth, controller.atualizarFicha);
router.put('/:id/combate', auth, controller.atualizarCombate);
router.delete('/:id', auth, controller.deletarFicha);

//Adicionar e remover habilidades

router.post('/:id/habilidades', auth, controller.adicionarHabilidade);
router.delete('/:id/habilidades/:habilidadeId', auth, controller.removerHabilidade);

//Adicionar e remover rituais

router.post('/:id/rituais', auth, controller.adicionarRitual);
router.delete('/:id/rituais/:ritualId', auth, controller.removerRitual);

//export

module.exports = router;