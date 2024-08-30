const express = require('express');
const router = express.Router();
const puestoController = require('../controllers/puestoController');

router.route('/')
    .post(puestoController.addPuesto)
    .get(puestoController.getAllPuestos);

router.route('/:id')
    .delete(puestoController.deletePuesto)
    .put(puestoController.updatePuesto);

module.exports = router;