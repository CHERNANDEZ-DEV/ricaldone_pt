const Area = require('../models/areaModel');

const addArea = async (areaData) => {
    const newArea = new Area(areaData);
    return await newArea.save();
}

const getAllAreas = async () => {
    return await Area.find().populate('puestos').populate('empleados');
}

const updateAreaById = async (id, areaData) => {
    return await Area.findByIdAndUpdate(id, areaData, {new: true, runValidators: true});
}

const deleteAreaById = async (id) => {
    return await Area.findByIdAndDelete(id);
}

module.exports = {
    addArea,
    getAllAreas,
    deleteAreaById,
    updateAreaById
}