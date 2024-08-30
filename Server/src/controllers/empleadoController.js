const empleadoService = require('../services/empleadoService');

const addEmpleado = async (req, res) => {
    const {nombre, apellido, email, edad, genero, area, puesto} = req.body;
    try{
        const savedEmpleado = await empleadoService.addEmpleado({nombre, apellido, email, edad, genero, area, puesto });
        res.status(201).json({
            status: 'success',
            data: {empleado: savedEmpleado}
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getEmpleados = async (req, res) => {

    try{
        const empleados = await empleadoService.getAllEmpleados();
        res.status(200).json({
            status: 'success',
            results: empleados.length,
            data: {empleados}
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const updateEmpleado = async (req, res) => {
    try{
        const empleado = await empleadoService.updateEmpleadoById(req.params.id, req.body);

        if(!empleado){
            return res.status (404).json({
                status: 'fail',
                message: 'Empleado not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { empleado }
        });

    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

const deleteEmpleado = async (req, res) => {
    try{
        const empleado = await empleadoService.deleteEmpleadoById(req.params.id);
        if(!empleado){
            return res.status(404).json({
                status: 'fail',
                message: 'Empleado not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

module.exports = {
    addEmpleado,
    getEmpleados,
    deleteEmpleado,
    updateEmpleado
}