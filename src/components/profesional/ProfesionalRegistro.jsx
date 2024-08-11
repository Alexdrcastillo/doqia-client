import React, { useState } from 'react';
import NavBar from '../navbar/NavBar';
import Flechita from "../perfil/images/flechita.png";
import { Link } from 'react-router-dom';
import axios from 'axios';

// Array con todas las ciudades de España
const ciudadesDeEspaña = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas de Gran Canaria',
  'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 'Lérida', 'Huelva', 'Salamanca', 'Almería', 'Logroño',
  'Badajoz', 'Jerez de la Frontera', 'Huesca', 'Toledo', 'A Coruña', 'San Sebastián', 'Tarragona', 'Albacete', 'Soria',
  'Segovia', 'Jaén', 'Ciudad Real', 'Ronda', 'Lugo', 'Cádiz', 'Girona', 'Avilés', 'La Rasa', 'Granada', 'Mataró',
  'Fuenlabrada', 'Elche', 'Barakaldo', 'Santiago de Compostela', 'Cáceres', 'Alcalá de Henares', 'Móstoles', 'Ourese',
  'Getafe', 'Santa Cruz de Tenerife', 'Puerto de la Cruz', 'Ávila', 'Algeciras', 'Jaén', 'Sabadell', 'Reus', 'Santander',
  'Martorell', 'Torrevieja', 'Alcalá de Henares', 'Melilla', 'Ceuta', 'La Línea de la Concepción', 'Talavera de la Reina'
];

const ProfesionalRegistro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    numero_salud: '',
    ciudad: '',
    image_url: null,
    available_times: []
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timeRange, setTimeRange] = useState({
    day: '',
    startTime: '',
    endTime: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image_url: event.target.files[0] });
  };

  const handleTimeRangeChange = (event) => {
    const { name, value } = event.target;
    setTimeRange({ ...timeRange, [name]: value });
  };

  const addTimeRange = () => {
    setFormData(prevState => ({
      ...prevState,
      available_times: [...prevState.available_times, timeRange]
    }));
    setTimeRange({ day: '', startTime: '', endTime: '' }); // Reset time range
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
  
    // Agregar campos de formulario a FormData
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'image_url' && value) {
        // Si hay una imagen, agregarla directamente a FormData
        data.append(key, value);
      } else if (key === 'available_times') {
        // Convertir available_times a JSON para enviar como una cadena
        data.append(key, JSON.stringify(value));
      } else {
        // Agregar otros campos de texto
        data.append(key, value);
      }
    }
  
    try {
      const response = await axios.post('http://localhost:5000/users', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User created successfully:', response.data);
      setFormData({
        username: '',
        email: '',
        password: '',
        numero_salud: '',
        ciudad: '',
        image_url: null,
        available_times: []
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('There was an error creating the user:', error);
    }
  };

  

  return (
    <div>
      <div className='mt-[40vh]'>
        <NavBar />
      </div>
      <div className='mt-[30vh] ml-12 flex'>
        <Link to={"/"}>
          <img src={Flechita} className='w-[8vh] h-9 mt-2' alt="Flechita"/>
        </Link>
        <h1 className='mt-2 text-[3.5vh] ml-5'>Trabaja con Doqia</h1>
      </div>

      <div className='mt-12'>
        <h1 className='ml-12 mt-2 text-[4vh]'>¿Cómo funciona?</h1>
        <p className='ml-12 mt-12 w-[200vh]'>Con estos simples pasos podrás comenzar a brindar atención médica a través de nuestra plataforma. Si tienes alguna pregunta o necesitas ayuda en cualquier momento, nuestro equipo de soporte estará encantado de ayudarte.</p>
        <h1 className='ml-12 mt-12 text-[4vh]'>¡Bienvenido a bordo!</h1>
      </div>

      {formSubmitted ? (
        <div className='mt-12 ml-12 text-[3vh]'>
          <p>Se ha enviado el formulario. Esté atento para iniciar sesión y poder atender pacientes.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center h-[50vh]">
            <div className='bg-[#EBEBEC] w-[70vh] mt-[100vh] rounded-lg p-4'>
              <strong className='text-[4vh] ml-2'>Registro de Profesional</strong>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Username</label>
                <input 
                  type='text' 
                  name='username' 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input 
                  type='email' 
                  name='email' 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Password</label>
                <input 
                  type='password' 
                  name='password' 
                  value={formData.password} 
                  onChange={handleInputChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Número de Salud</label>
                <input 
                  type='text' 
                  name='numero_salud' 
                  value={formData.numero_salud} 
                  onChange={handleInputChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Ciudad</label>
                <select 
                  name='ciudad' 
                  value={formData.ciudad} 
                  onChange={handleInputChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]'
                >
                  <option value=''>Selecciona tu ciudad</option>
                  {ciudadesDeEspaña.map((ciudad, index) => (
                    <option key={index} value={ciudad}>{ciudad}</option>
                  ))}
                </select>
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Imagen de Perfil</label>
                <input 
                  type='file' 
                  name='image_url' 
                  accept='image/*' 
                  onChange={handleImageChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Día</label>
                <input 
                  type='text' 
                  name='day' 
                  value={timeRange.day} 
                  onChange={handleTimeRangeChange} 
                  placeholder='e.g., Lunes' 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Hora de Inicio</label>
                <input 
                  type='time' 
                  name='startTime' 
                  value={timeRange.startTime} 
                  onChange={handleTimeRangeChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700'>Hora de Fin</label>
                <input 
                  type='time' 
                  name='endTime' 
                  value={timeRange.endTime} 
                  onChange={handleTimeRangeChange} 
                  className='mt-1 p-2 rounded-lg border border-gray-300 w-[30vh]' 
                />
              </div>
              <button 
                type='button' 
                onClick={addTimeRange} 
                className='mt-4 bg-blue-500 text-white p-2 rounded-lg'
              >
                Agregar Franja Horaria
              </button>
              <div className='mt-4'>
                {formData.available_times.length > 0 && (
                  <ul>
                    {formData.available_times.map((time, index) => (
                      <li key={index}>
                        {time.day} - {time.startTime} a {time.endTime}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className='mt-4 flex justify-center'>
                <button 
                  type='submit' 
                  className='bg-blue-500 text-white p-2 rounded-lg'
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfesionalRegistro;
