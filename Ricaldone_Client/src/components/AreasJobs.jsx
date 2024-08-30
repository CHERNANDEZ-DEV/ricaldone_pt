import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AreasJobs = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/areas/')
      .then(response => {
        setAreas(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las areas:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al obtener las áreas. Por favor, intenta nuevamente más tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
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
        axios.delete(`http://localhost:5002/api/areas/${id}`)
          .then(() => {
            setAreas(areas.filter(area => area._id !== id));
            Swal.fire(
              '¡Eliminado!',
              'El área ha sido eliminada.',
              'success'
            );
          })
          .catch(error => {
            console.error('Hubo un error al eliminar el área:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al eliminar el área. Por favor, intenta nuevamente más tarde.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  };

  return (
    <div className="bg-[#1A1A2E] text-white py-12 px-6 md:px-12 border-4 border-[#1A1A2E] rounded-t-3xl">
      <div className="max-w-8xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-xl font-semibold text-gray-400">Áreas de Desarrollo</h2>
          <h3 className="text-4xl font-bold text-white mb-4">Gestiona tus áreas y puestos de trabajo</h3>
          <p className="text-gray-300 max-w-lg mx-auto md:mx-0">
            Descubre cómo nuestras soluciones innovadoras pueden ayudar a elevar tu marca y alcanzar tus objetivos empresariales. Nos especializamos en una variedad de servicios adaptados a tus necesidades.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {areas.map((area, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-black mb-4">{area.nombre}</h4>
              <p className="text-black">{area.descripcion}</p>
              <button 
                onClick={() => handleDelete(area._id)} 
                className="bg-red-500 text-white p-2 mt-4 rounded hover:bg-red-700"
              >
                Eliminar Área
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreasJobs;



