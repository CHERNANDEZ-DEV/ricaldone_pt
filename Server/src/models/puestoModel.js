const mongoose = require('mongoose');

const puestoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    // Referenciar al area al que pertenece el puesto
    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true},
    // Lista de empleados que ocupan el puesto
    empleados: [{type: mongoose.Schema.Types.ObjectId, ref: 'Empleado'}],
});

module.exports = mongoose.model('Puesto', puestoSchema);