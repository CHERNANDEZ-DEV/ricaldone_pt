const Empleado = require('../models/empleadoModel');
const Area = require('../models/areaModel');
const Puesto = require('../models/puestoModel');

const addEmpleado = async (empleadoData) => {
    const newEmpleado = new Empleado(empleadoData);

    const area = await Area.findById(empleadoData.area);
    if(!area){
        throw new Error('Area not found');
    }

    const puesto = await Puesto.findById(empleadoData.puesto);
    if(!puesto){
        throw new Error('Puesto not found');
    }

    area.empleados = area.empleados.concat(newEmpleado._id);
    await area.save();

    puesto.empleados = puesto.empleados.concat(newEmpleado._id);
    await puesto.save();

    return await newEmpleado.save();

};

const getAllEmpleados = async () => {
    return await Empleado.find().populate('area', 'nombre').populate('puesto', 'nombre');
};


const updateEmpleadoById = async (id, empleadoData) => {

    return await Empleado.findByIdAndUpdate(id, empleadoData, {new: true, runValidators: true});
}

const deleteEmpleadoById = async (id) => {
    return await Empleado.findByIdAndDelete(id);
};


module.exports = {
    addEmpleado,
    getAllEmpleados,
    deleteEmpleadoById,
    updateEmpleadoById
}