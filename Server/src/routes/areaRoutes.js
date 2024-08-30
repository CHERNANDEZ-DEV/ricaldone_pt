const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.route('/')
    .post(areaController.addArea)
    .get(areaController.getAllAreas);

router.route('/:id')
    .delete(areaController.deleteAreaById)
    .put(areaController.updateAreaById);

module.exports = router;