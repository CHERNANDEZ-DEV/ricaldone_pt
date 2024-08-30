const puestoService = require('../services/puestoService');

const addPuesto = async (req, res) => {
    const {nombre, descripcion, area} = req.body;
    const puestoData = {nombre, descripcion, area};
    try{
        const puesto = await puestoService.addPuesto(puestoData);
        res.status(201).json(puesto);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAllPuestos = async (req, res) => {
    try{
        const puestos = await puestoService.getAllPuestos();
        res.status(200).json(puestos);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updatePuesto = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion} = req.body;
    const puestoData = {nombre, descripcion};
    try{
        const puesto = await puestoService.updatePuestoById(id, puestoData);
        res.status(200).json(puesto);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deletePuesto = async (req, res) => {  
    const {id} = req.params;
    try{
        await puestoService.deletePuestoById(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {
    addPuesto,
    getAllPuestos,
    deletePuesto,
    updatePuesto
}