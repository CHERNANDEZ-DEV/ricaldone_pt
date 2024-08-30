import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAreaAndPositionForm = () => {
  const [areaData, setAreaData] = useState({
    nombre: '',
    descripcion: ''
  });

  const [positionData, setPositionData] = useState({
    nombre: '',
    descripcion: '',
    area: ''
  });

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/areas/')
      .then(response => {
        setAreas(response.data); // Asegúrate de que esto coincida con la estructura de tu backend
      })
      .catch(error => {
        console.error('Error al obtener áreas:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al obtener las áreas. Por favor, intenta nuevamente más tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }, []);

  const handleAreaChange = (e) => {
    setAreaData({
      ...areaData,
      [e.target.name]: e.target.value
    });
  };

  const handlePositionChange = (e) => {
    setPositionData({
      ...positionData,
      [e.target.name]: e.target.value
    });
  };

  const handleAreaSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5002/api/areas/', areaData)
      .then(response => {
        console.log('Área añadida:', response.data);
        setAreaData({ nombre: '', descripcion: '' });
        setAreas([...areas, response.data]); // Actualizar lista de áreas después de añadir una nueva
        Swal.fire({
          title: 'Éxito',
          text: 'El área ha sido añadida exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error('Error al añadir área:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al añadir el área. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const handlePositionSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5002/api/puestos/', positionData)
      .then(response => {
        console.log('Puesto añadido:', response.data);
        setPositionData({ nombre: '', descripcion: '', area: '' });
        Swal.fire({
          title: 'Éxito',
          text: 'El puesto ha sido añadido exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      })
      .catch(error => {
        console.error('Error al añadir puesto:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al añadir el puesto. Por favor, intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg pl-12 pr-12 pb-12">
      <div>
        <h3 className="text-4xl font-bold mb-4">Añadir Nuevas Áreas de Trabajo</h3>
        <form onSubmit={handleAreaSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Área:</label>
            <input
              type="text"
              name="nombre"
              value={areaData.nombre}
              onChange={handleAreaChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={areaData.descripcion}
              onChange={handleAreaChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Añadir Área
          </button>
        </form>
      </div>
      <div className="mt-12">
        <h3 className="text-4xl font-bold mb-4">Añadir Nuevos Puestos de Trabajo</h3>
        <form onSubmit={handlePositionSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Puesto:</label>
            <input
              type="text"
              name="nombre"
              value={positionData.nombre}
              onChange={handlePositionChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={positionData.descripcion}
              onChange={handlePositionChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Área:</label>
            <select
              name="area"
              value={positionData.area}
              onChange={handlePositionChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Seleccione una área</option>
              {areas.map(area => (
                <option key={area._id} value={area._id}>
                  {area.nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            Añadir Puesto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAreaAndPositionForm;

