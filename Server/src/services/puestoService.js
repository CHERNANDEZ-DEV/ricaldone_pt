const Puesto = require('../models/puestoModel');
const Area = require('../models/areaModel');

const addPuesto = async (puestoData) => {
    const newPuesto = new Puesto(puestoData);
    const area = await Area.findById(puestoData.area);
    if(!area){
        throw new Error('Area not found');
    }

    area.puestos = area.puestos.concat(newPuesto._id);
    await area.save();
    

    return await newPuesto.save();
}

const getAllPuestos = async () => {
    return await Puesto.find().populate('area', 'nombre');
}

const updatePuestoById = async (id, puestoData) => {
    return await Puesto.findByIdAndUpdate(id, puestoData, {new: true, runValidators: true});
}

const deletePuestoById = async (id) => {
    return await Puesto.findByIdAndDelete(id);
}

module.exports = {
    addPuesto,
    getAllPuestos,
    deletePuestoById,
    updatePuestoById
}