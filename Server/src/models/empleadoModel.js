const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, requiered: true},
    edad: {type: Number, requiered: true},
    genero: {type: String, required: true},
    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'},
    puesto: {type: mongoose.Schema.Types.ObjectId, ref: 'Puesto'},

});

module.exports = mongoose.model('Empleado', empleadoSchema);