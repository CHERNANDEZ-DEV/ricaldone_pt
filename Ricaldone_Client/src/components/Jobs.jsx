import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/puestos/')
      .then(response => {
        setAreas(response.data); // Asegúrate de que esto coincide con la estructura de tu backend
      })
      .catch(error => {
        console.error('Hubo un error al obtener los puestos:', error);
      });
  }, []);

  return (
    <div className="bg-white text-white py-12 px-6 md:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-xl font-semibold text-gray-600">Puestos de Alto Impacto</h2>
          <h3 className="text-4xl font-bold text-black mb-4">Innovando desde muchas disciplinas</h3>
          <p className="text-gray-500 max-w-lg mx-auto md:mx-0">
            Discover how our innovative solutions can help elevate your brand and achieve your business goals. We specialize in a variety of services tailored to meet your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {areas.map((puesto, index) => (
            <div key={index} className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-lg shadow-lg">
              <div className="flex-grow">
                <h4 className="text-xl font-semibold text-white">{puesto.nombre}</h4>
                <p className="text-white">{puesto.descripcion}</p> {/* Muestra el nombre del área alineado horizontalmente */}
              </div>
              <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-full">
                {puesto.area.nombre}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

