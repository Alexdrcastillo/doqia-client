import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Flechita from './images/flechita.png';

// Lista de ciudades españolas (ejemplo)
const cities = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas de Gran Canaria", "Bilbao",
  "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "L'Hospitalet de Llobregat", "La Coruña", "Granada", "Elche", "Oviedo"
];

const occupations = [
  "Médico",
  "Fisioterapeuta",
  "Psicólogo",
  "Nutricionista",
  "Entrenador"
];

const subOccupations = {
  "Fisioterapeuta": [
    "Fisioterapeuta - Tercera Edad", "Fisioterapeuta - Rehabilitación de Lesiones",
    "Fisioterapeuta - Deportistas", "Fisioterapeuta - Masoterapia", "Fisioterapeuta - Infantil"
  ],
  "Psicólogo": [
    "Psicólogo - Terapia Individual", "Psicólogo - Terapia de Pareja",
    "Psicólogo - Terapia Familiar", "Psicólogo - Terapia de Niños y Adolescentes"
  ]
};

const PerfilProfesional = () => {
  const { id: userId } = useParams();
  const [services, setServices] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [newService, setNewService] = useState({
    description: '',
    address: '',
    occupation: '',
    subOccupation: '',
    type: 'telemedicina',
    prices: {}  // Campo para los precios de ocupaciones
  });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const [showAcceptedReservationsModal, setShowAcceptedReservationsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}/services`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });

    axios.get(`http://localhost:5000/users/${userId}/provider_reservations`)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handlePriceChange = (key, price) => {
    setNewService(prevService => ({
      ...prevService,
      prices: {
        ...prevService.prices,
        [key]: price
      }
    }));
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();

    // Verificar que el campo address no esté vacío
    if (!newService.address) {
      alert('Por favor, selecciona una dirección.');
      return;
    }

    // Verificar que si el tipo es 'domicilio', la dirección sea 'Barcelona'
    if (newService.type === 'domicilio' && newService.address !== 'Barcelona') {
      alert('Para el tipo de servicio "domicilio", la dirección debe ser Barcelona.');
      return;
    }

    axios.post('http://localhost:5000/services', { ...newService, user_id: userId })
      .then(response => {
        setServices([...services, response.data]);
        setNewService({
          description: '',
          address: '',
          occupation: '',
          subOccupation: '',
          type: 'telemedicina',
          prices: {}  // Reiniciar los precios
        });
        setShowServiceModal(false);
      })
      .catch(error => {
        console.error('Error creating service:', error);
      });
  };

  const acceptReservation = (reservationId) => {
    axios.put(`http://localhost:5000/reservations/${reservationId}/accept`, { accept: true })
      .then(response => {
        setReservations(prevReservations => prevReservations.map(reservation =>
          reservation.id === reservationId ? { ...reservation, accept: true } : reservation
        ));
      })
      .catch(error => {
        console.error('Error accepting reservation:', error);
      });
  };

  const cancelReservation = (reservationId) => {
    axios.put(`http://localhost:5000/reservations/${reservationId}/accept`, { accept: false })
      .then(response => {
        setReservations(prevReservations => prevReservations.map(reservation =>
          reservation.id === reservationId ? { ...reservation, accept: false } : reservation
        ));
      })
      .catch(error => {
        console.error('Error canceling reservation:', error);
      });
  };

  const showAcceptedReservations = () => {
    setShowAcceptedReservationsModal(true);
  };

  // Filtrar las ciudades según el tipo de servicio
  const getAddressOptions = () => {
    if (newService.type === 'domicilio') {
      return ['Barcelona'];
    }
    return cities;
  };

  return (
    <div className="bg-white min-h-screen mt-[40vh]">
      <NavBar />
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <img src={Flechita} className="w-8 h-8" alt="Flechita" />
          </Link>
          <h1 className="text-[#3F6267] text-4xl font-bold">Hola!, {user.username}</h1>
        </div>
        <h2 className="text-[#8792A0] text-3xl mt-4">Perfil</h2>

        <section className="mt-8 flex items-start gap-6">
          <div className="max-w-[80vh]">
            <h3 className="text-[#3F6267] text-2xl sm:mt-0 mt-[10vh] font-semibold ml-12">Servicios</h3>
            <ul className="list-disc ml-6 mt-2 ">
              {services.map((service) => (
                <div key={service.id} className="border w-[45vh] sm:w-[80vh] sm:ml-0 ml-[-2vh] p-4 mb-4 rounded-lg bg-[#EBEBEC]">
                  <div className="bg-[#82BFD6] w-[30vh] sm:w-[55vh] ml-12 mt-[-2.5vh] mb-2 h-2 rounded-[10vh]"></div>
                  <div className="text-white bg-[#82BFD6] w-23 text-center rounded-[4vh] overflow-hidden ml-[50vh]">
                    {service.type}
                  </div>
                  <p className="flex items-center mb-2">
                    <strong className="mr-[17vh]">Ciudad</strong>
                    {service.address}
                  </p>
                  <p className="flex items-center mb-2">
                    <strong className="mr-[5.4vh]">Descripción del servicio</strong>
                    {service.description}
                  </p>
                 

                  <button
                    onClick={() => cancelReservation(service.id)}
                    className="bg-[#B6B6B6] text-white px-4 text-lg py-2 rounded hover:bg-red-700 mt-4"
                  >
                    Cancelar Sesión
                  </button>
                </div>
              ))}
            </ul> 
            <div className='w-[50vh]'></div>
            <div className="flex sm:ml-0 ml-[-24vh] sm:mt-0 mt-[-3vh] justify-center">
              <button
                onClick={() => setShowServiceModal(true)}
                className="bg-[#3F6267] text-white px-4 py-2 rounded mt-4 hover:bg-[#2b4a50]"
              >
                Agregar Nuevo Servicio
              </button>
            </div>
          </div>
        </section>

        <section className="flex justify-end sm:mt-[-35vh] sm:ml-0 ml-[24vh] mt-[-4.7vh]">
          <div className='flex-wrap'>
            <button
              onClick={() => setShowReservationsModal(true)}
              className="bg-[#3F6267] text-white px-4 py-2 rounded mt-4 hover:bg-[#2b4a50]"
            >
              Ver Mis Sesiones
            </button>
          </div>
        </section>
      </div>

      {showServiceModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-[70vh] h-[80vh] overflow-auto">
            <h3 className="text-2xl font-semibold mb-4">Agregar Nuevo Servicio</h3>
            <form onSubmit={handleServiceSubmit}>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Sobre mi:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  placeholder='Ej: una breve descripcion sobre ti y tus ocupaciones'
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>


              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Tipo de Servicio:
                </label>
                <select
                  id="type"
                  name="type"
                  value={newService.type}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="telemedicina">Telemedicina</option>
                  <option value="domicilio">Domicilio</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                  Ciudad:
                </label>
                <select
                  id="address"
                  name="address"
                  value={newService.address}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                >
                  <option value="">Selecciona una ciudad</option>
                  {getAddressOptions().map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              
              <div className="mb-4">
                <label htmlFor="occupation" className="block text-gray-700 font-bold mb-2">
                  Ocupación:
                </label>
                <select
                  id="occupation"
                  name="occupation"
                  value={newService.occupation}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">Selecciona una ocupación</option>
                  {occupations.map((occupation, index) => (
                    <option key={index} value={occupation}>{occupation}</option>
                  ))}
                </select>
              </div>

              {newService.occupation && (
                <div className="mb-4">
                  <label htmlFor="subOccupation" className="block text-gray-700 font-bold mb-2">
                    Subocupación:
                  </label>
                  <select
                    id="subOccupation"
                    name="subOccupation"
                    value={newService.subOccupation}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                  >
                    <option value="">Selecciona una subocupación</option>
                    {subOccupations[newService.occupation]?.map((subOccupation, index) => (
                      <option key={index} value={subOccupation}>{subOccupation}</option>
                    ))}
                  </select>
                </div>
              )}

              {(newService.occupation || newService.subOccupation) && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Precios:</label>
                  <div className="grid grid-cols-1 gap-4">
                    {newService.occupation && (
                      <div>
                        <label className="block text-gray-700 font-semibold">{newService.occupation}:</label>
                        <input
                          type="number"
                          value={newService.prices[newService.occupation] || ''}
                          onChange={(e) => handlePriceChange(newService.occupation, e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          placeholder="Precio"
                        />
                      </div>
                    )}
                    {newService.subOccupation && (
                      <div>
                        <label className="block text-gray-700 font-semibold">{newService.subOccupation}:</label>
                        <input
                          type="number"
                          value={newService.prices[newService.subOccupation] || ''}
                          onChange={(e) => handlePriceChange(newService.subOccupation, e.target.value)}
                          className="border rounded w-full py-2 px-3 text-gray-700"
                          placeholder="Precio"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReservationsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-[70vh] h-[80vh] overflow-auto">
            <h3 className="text-2xl font-semibold mb-4">Mis Sesiones</h3>
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation.id} className="mb-4">
                  <div className="border p-4 rounded-lg">
                    <p><strong>Fecha:</strong> {reservation.reservation_date}</p>
                    <p><strong>Tipo:</strong> {reservation.type}</p>
                    <p><strong>Nombre del Paciente:</strong> {reservation.patient_name}</p>
                    <p><strong>Dirección:</strong> {reservation.address}</p>
                    <p><strong>Hora Seleccionada:</strong> {reservation.selected_time_slot}</p>
                    <p><strong>Comentario:</strong> {reservation.comment}</p>
                    <p><strong>Servicio:</strong> {reservation.selected_service}</p>
                    <p><strong>Estado:</strong> {reservation.accept ? "Aceptado" : "Pendiente"}</p>
                    <div className="flex justify-end">
                      {reservation.accept ? (
                        <button
                          onClick={() => cancelReservation(reservation.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Cancelar
                        </button>
                      ) : (
                        <button
                          onClick={() => acceptReservation(reservation.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Aceptar
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowReservationsModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
              >
                Cerrar
              </button>
              <button
                onClick={showAcceptedReservations}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Ver Aceptadas
              </button>
            </div>
          </div>
        </div>
      )}

      {showAcceptedReservationsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-[70vh] h-[80vh] overflow-auto">
            <h3 className="text-2xl font-semibold mb-4">Sesiones Aceptadas</h3>
            <ul>
              {reservations.filter(reservation => reservation.accept).map((reservation) => (
                <li key={reservation.id} className="mb-4">
                  <div className="border p-4 rounded-lg">
                    <p><strong>Fecha:</strong> {reservation.reservation_date}</p>
                    <p><strong>Tipo:</strong> {reservation.type}</p>
                    <p><strong>Nombre del Paciente:</strong> {reservation.patient_name}</p>
                    <p><strong>Dirección:</strong> {reservation.address}</p>
                    <p><strong>Hora Seleccionada:</strong> {reservation.selected_time_slot}</p>
                    <p><strong>Comentario:</strong> {reservation.comment}</p>
                    <p><strong>Servicio:</strong> {reservation.selected_service}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAcceptedReservationsModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilProfesional;
