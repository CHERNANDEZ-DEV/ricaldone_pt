import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    edad: '',
    genero: '',
    area: '',  // Cambiado a "area"
    puesto: '' // Cambiado a "puesto"
  });

  const [areas, setAreas] = useState([]);
  const [puestos, setPuestos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/areas/')
      .then(response => {
        setAreas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener áreas:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.area) { // Cambiado a "area"
      const areaSeleccionada = areas.find(area => area._id === formData.area); // Cambiado a "area"
      if (areaSeleccionada) {
        setPuestos(areaSeleccionada.puestos || []);
      }
    }
  }, [formData.area, areas]); // Cambiado a "area"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5002/api/empleados/', formData)
      .then(response => {
        Swal.fire({
          title: 'Empleado registrado',
          text: 'El empleado ha sido registrado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          edad: '',
          genero: '',
          area: '', // Reseteado a "area"
          puesto: '' // Reseteado a "puesto"
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al registrar el empleado.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Hubo un error al registrar el empleado:', error);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg pb-12 px-6 md:px-12">
      <h3 className="text-4xl font-bold mb-4">Añade Nuevos Talentos</h3>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        {/* Apellido */}
        <div className="mb-4">
          <label className="block text-gray-700">Apellido Completo:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        {/* Edad */}
        <div className="mb-4">
          <label className="block text-gray-700">Edad:</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        {/* Género */}
        <div className="mb-4">
          <label className="block text-gray-700">Género:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        {/* Área */}
        <div className="mb-4">
          <label className="block text-gray-700">Área:</label>
          <select
            name="area" // Cambiado a "area"
            value={formData.area} // Cambiado a "area"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Seleccione un área de Trabajo</option>
            {areas.map(area => (
              <option key={area._id} value={area._id}>{area.nombre}</option>
            ))}
          </select>
        </div>
        {/* Puesto */}
        <div className="mb-4">
          <label className="block text-gray-700">Puesto:</label>
          <select
            name="puesto" // Cambiado a "puesto"
            value={formData.puesto} // Cambiado a "puesto"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Seleccione un puesto</option>
            {puestos.map(puesto => (
              <option key={puesto._id} value={puesto._id}>{puesto.nombre}</option>
            ))}
          </select>
        </div>
        {/* Botón de envío */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Registrar Empleado
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;




