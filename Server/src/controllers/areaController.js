const areaService = require('../services/areaService');

const addArea = async (req, res) => {
    const {nombre, descripcion} = req.body;
    const areaData = {nombre, descripcion};
    try{
        const area = await areaService.addArea(areaData);
        res.status(201).json(area);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAllAreas = async (req, res) => {
    try{
        const areas = await areaService.getAllAreas();
        res.status(200).json(areas);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateAreaById = async (req, res) => {
    const {id} = req.params;
    const areaData = req.body;
    try{
        const area = await areaService.updateAreaById(id, areaData);
        res.status(200).json(area);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteAreaById = async (req, res) => {
    const {id} = req.params;
    try{
        const area = await areaService.deleteAreaById(id);
        res.status(200).json(area);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    addArea,
    getAllAreas,
    updateAreaById,
    deleteAreaById
}