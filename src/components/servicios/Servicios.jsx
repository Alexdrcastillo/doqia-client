import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar/NavBar';
import Flechita from '../perfil/images/flechita.png';
import VerifiedIcon from "./images/verified.png";

const DEFAULT_IMAGE_URL = "https://eunamed.com/wp-content/uploads/2021/02/medico-especialista-en-chile-768x512.jpg";

const Servicios = () => {
  const { address, servicio, tipo } = useParams();
  const [todosLosServicios, setTodosLosServicios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        if (!address || !servicio) {
          throw new Error('Dirección o servicio no especificado');
        }

        const response = await axios.get(`http://localhost:5000/services/${encodeURIComponent(address)}/${encodeURIComponent(servicio)}`);
        setTodosLosServicios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchServicios();
  }, [address, servicio]);

  // Filtrar los servicios según el tipo, la ciudad y la ocupación dentro de 'prices'
  const serviciosFiltrados = todosLosServicios.filter(service => {
    const matchesType = tipo === 'ambos' || service.type === tipo;
    const matchesAddress = service.address.toLowerCase() === address.toLowerCase();
    const matchesServicio = Object.keys(service.prices).some(key => key.toLowerCase() === servicio.toLowerCase());
    return matchesServicio && matchesType && matchesAddress;
  });

  const handleServiceClick = (serviceId) => {
    navigate(`/servicio/${serviceId}`);
  };

  return (
    <div>
      <div className='mt-[40vh]'>
        <NavBar />
      </div>
      <div className='mt-[27vh] ml-12'>
        <div className='flex gap-12'>
          <Link to={"/"}>
            <img src={Flechita} className='w-[8vh] h-9 mt-2' alt="Back to Home" />
          </Link>
        </div>
        <div className='flex flex-col text-[6vh] text-[#3F6267]'>
          <h1 className="text-center">{servicio} en {address}</h1>
        </div>
        <div className='mt-8'>
          {loading ? (
            <p className='text-center'>Cargando...</p>
          ) : error ? (
            <p className='text-center'>Error: {error}</p>
          ) : serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map(service => (
              <div 
                key={service.id} 
                onClick={() => handleServiceClick(service.id)} 
                className='relative mt-4 w-[47vh] sm:w-[120vh] h-[65vh] sm:h-[38vh] mx-auto p-4 border rounded-lg bg-[#EBEBEC] flex flex-col'>
                
                <div className='flex justify-between items-start'>
                  <div className='flex items-center'>
                    <img
                      className="w-[13vh] h-[11vh] rounded-full"
                      src={service.image_url || DEFAULT_IMAGE_URL}
                      alt={service.username}
                    />
                    <div className='ml-4'>
                      <div className='flex items-center'>
                        <h2 className='text-[3.6vh]'>{service.username}</h2>
                        <img src={VerifiedIcon} className='w-[4vh] h-[4vh] ml-2' alt="Verified" />
                      </div>
                      <h1 className='mt-2'>{servicio}</h1>
                      <h1 className='mt-2'>N° SNS {service.numero_salud}</h1>
                    </div>
                  </div>
                  <div className='absolute top-2 right-2 p-2 border rounded'>
  <h3 className='text-black text-[3vh] flex'>
    <h6 className='text-[2.5vh]'>Desde</h6>
    <span className='ml-2'>{service.prices[servicio]} €</span>
  </h3>
</div>

                </div>
                <h1 className='text-[#4A696E] mt-4'>Sobre mi</h1>
                <p>{service.description}</p>
                <p>{service.address}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron servicios para "{servicio}" en {address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicios;
