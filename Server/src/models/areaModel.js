const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    // Referenciar a la colección puesto
    puestos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Puesto'}],
    // Lista de empleados que pertenecen al área
    empleados: [{type: mongoose.Schema.Types.ObjectId, ref: 'Empleado'}],
});

module.exports = mongoose.model('Area', areaSchema)