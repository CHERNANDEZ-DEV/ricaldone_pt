const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

router.route('/')
    .post(empleadoController.addEmpleado)
    .get(empleadoController.getEmpleados);

router.route('/:id')
    .delete(empleadoController.deleteEmpleado)
    .put(empleadoController.updateEmpleado);


module.exports = router;