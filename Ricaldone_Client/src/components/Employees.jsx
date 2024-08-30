import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Employees = () => {
  const [empleados, setEmpleados] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableEmpleado, setEditableEmpleado] = useState({ nombre: '', areaId: '', puestoId: '' });
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/empleados/')
      .then(response => setEmpleados(response.data.data.empleados))
      .catch(error => console.error('Error al obtener los empleados:', error));

    axios.get('http://localhost:5002/api/areas/')
      .then(response => setAreas(response.data))
      .catch(error => console.error('Error al obtener las áreas:', error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5002/api/empleados/${id}`)
          .then(() => {
            setEmpleados(empleados.filter(empleado => empleado._id !== id));
            Swal.fire(
              '¡Eliminado!',
              'El empleado ha sido eliminado.',
              'success'
            );
          })
          .catch(error => console.error('Error al eliminar el empleado:', error));
      }
    });
  };

  const handleEdit = (empleado) => {
    setEditableEmpleado({
      ...empleado,
      areaId: empleado.area._id,
      puestoId: empleado.puesto._id
    });
    setIsModalOpen(true);

    const selectedArea = areas.find(area => area._id === empleado.area._id);
    if (selectedArea) {
      setPuestos(selectedArea.puestos);
    } else {
      setPuestos([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditableEmpleado({ nombre: '', areaId: '', puestoId: '' });
    setPuestos([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEmpleado({ ...editableEmpleado, [name]: value });

    if (name === 'areaId') {
      const selectedArea = areas.find(area => area._id === value);
      setPuestos(selectedArea ? selectedArea.puestos : []);
      setEditableEmpleado((prev) => ({ ...prev, puestoId: '' })); // Resetear puesto al cambiar el área
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const updatedEmpleado = {
      nombre: editableEmpleado.nombre,
      apellido: editableEmpleado.apellido,
      email: editableEmpleado.email,
      edad: editableEmpleado.edad,
      genero: editableEmpleado.genero,
      area: editableEmpleado.areaId,
      puesto: editableEmpleado.puestoId,  // Asegurarse de que el puestoId se envíe correctamente
    };

    axios.put(`http://localhost:5002/api/empleados/${editableEmpleado._id}`, updatedEmpleado)
      .then(response => {
        const updatedEmpleados = empleados.map(emp => emp._id === editableEmpleado._id ? { ...emp, ...response.data } : emp);
        setEmpleados(updatedEmpleados);
        handleCloseModal();
      })
      .catch(error => console.error('Error al actualizar el empleado:', error));
  };

  return (
    <div className="bg-white text-black py-12 px-6 md:px-12">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={handleCloseModal}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Editar Empleado</h3>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                name="nombre"
                value={editableEmpleado.nombre || ''}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded mt-1"
                required
              />
              <select
                name="areaId"
                value={editableEmpleado.areaId || ''}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Seleccione un área</option>
                {areas.map(area => (
                  <option key={area._id} value={area._id}>{area.nombre}</option>
                ))}
              </select>
              <select
                name="puestoId"
                value={editableEmpleado.puestoId || ''}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded mt-1"
                required
              >
                <option value="">Seleccione un puesto</option>
                {puestos.map(puesto => (
                  <option key={puesto._id} value={puesto._id}>{puesto.nombre}</option>
                ))}
              </select>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Guardar Cambios</button>
              <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 ml-4">Cancelar</button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-8xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-xl font-semibold text-gray-600">Empleados</h2>
          <h3 className="text-4xl font-bold mb-4">Talento Humano</h3>
          <p className="text-gray-500 max-w-lg mx-auto md:mx-0">
            Contamos con un amplio repertorio de profesionales a disposición del alumnado.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {empleados.map((empleado) => (
            <div key={empleado._id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-16 w-16 bg-yellow-200 rounded-full mb-4 mx-auto md:mx-0">
                <FontAwesomeIcon icon={faPalette} size="2x" className="text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-center md:text-left">{empleado.nombre}</h4>
              <p className="text-gray-600 text-center md:text-left">
                Área: {empleado.area.nombre} <br />
                Puesto: {empleado.puesto.nombre}
              </p>
              <div className="text-center md:text-left mt-4">
                <button onClick={() => handleEdit(empleado)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button onClick={() => handleDelete(empleado._id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 ml-4">
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;





