import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../navbar/NavBar';
import Flechita from '../perfil/images/flechita.png';
import VerifiedIcon from "./images/verified.png";
import SesionDomicilioTrue from "./images/sesionDomicilioTrue.png"
import SesionTelemedicinaFalse from "./images/sesionTelemedicinaFalse.png"
import StripeCheckout from 'react-stripe-checkout';

const ServicioSeleccionado = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cantidad, setCantidad] = useState(1)
    const [showTelemidicinaOption, setShowTelemedicinaOption] = useState(false)
    const [servicioSeleccionado, setServicioSeleccionado] = useState("")
    const [selectedOption, setSelectedOption] = useState(null);
    const [showCarrito, setShowCarrito] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [imagen, setImagen] = useState("")
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('');
    const [patient_name, setPatientName] = useState('');
    const [address, setAddress] = useState('');
    const [time_slot, setTimeSlot] = useState('');
    const [comment, setComment] = useState('');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [paymentStatus, setPaymentStatus] = useState(null); // Estado para guardar el resultado del pago
    const [showModalHorarios, setShowModalHorarios] = useState(false);
    const [horarios, setHorarios] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [weekDates, setWeekDates] = useState([]);
    const [orderedDays, setOrderedDays] = useState([]);

    useEffect(() => {
      const currentDate = new Date();
      const currentDayIndex = currentDate.getDay() - 1; // getDay() devuelve 0 para domingo, 1 para lunes, etc.
    
      // Reordenar días de la semana
      const ordered = [...daysOfWeek.slice(currentDayIndex), ...daysOfWeek.slice(0, currentDayIndex)];
      setOrderedDays(ordered);
    
      // Calcular las fechas correctas de la semana
      setWeekDates(getCurrentWeekDates(currentDate, currentDayIndex));
    }, []);
    
 
  
    const getCurrentWeekDates = (currentDate, currentDayIndex) => {
      const dates = [];
    
      for (let i = 0; i < 7; i++) { 
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i); 
        dates.push(date.getDate());
      }
    
      return dates;
    };

    
    
    
    const userId = user.id;
    useEffect(() => {
      const fetchServiceById = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/services/${serviceId}`);
              setService(response.data);
  
              let precio = 0;
  
              // Si existe una ocupación, busca su precio
              if (response.data.occupations && response.data.occupations.length > 0) {
                  const ocupacion = response.data.occupations[0]; // Usar la primera ocupación o puedes elegir otra lógica
                  precio = response.data.prices[ocupacion] || 0; // Busca el precio correspondiente en 'prices'
              } else {
                  // Si no hay ocupaciones, y hay precios disponibles
                  const keys = Object.keys(response.data.prices);
                  if (keys.length > 0) {
                      // Usa el primer precio disponible si no hay ocupaciones
                      precio = response.data.prices[keys[0]];
                  }
              }
  
              setAmount(precio); // Guarda el precio en el estado `amount`
  
              if (response.data.image_url) {
                  const imageUrl = `http://backend.doqia.es/${response.data.image_url}`;
                  setImagen(imageUrl);
              }
              setLoading(false);
          } catch (error) {
              console.error('Error fetching service:', error);
              setError(error.message);
              setLoading(false);
          }
      };
  
      fetchServiceById();
  }, [serviceId]);
  

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    const handleClickCantidadSuma = () => {
        if (cantidad < 4) {
            setCantidad(cantidad + 1);
        }
    }

    const calcularPrecioTotal = () => {
        const precioPorPersona = calcularPrecio();
        return precioPorPersona * cantidad;
      };
      const handleToken = async (token) => {
        try {
          const response = await axios.post('http://backend.doqia.es/create-payment-intent', {
            amount: calcularPrecioTotal() * 100  // Envía el monto total en centavos según el precio total
          });
          const clientSecret = response.data.clientSecret;
      


          // Realiza el pago
          const paymentResponse = await axios.post('http://backend.doqia.es/payment', {
            token,
            clientSecret,
            reservation: {
              userId,
              serviceId,
              reservation_date: new Date().toISOString(),
              type,
              patient_name,
              address,
              time_slot,
              comment
            }
          });
      
          // Guarda el estado del pago en localStorage o en estado de React según tu flujo
          localStorage.setItem('paymentStatus', 'success');
      
          // Maneja la respuesta del pago, pero crea la reserva sin importar el resultado del pago
          try {
            const reservationResponse = await axios.post('http://localhost:5000/reservations', {
              userId,
              serviceId,
              type,
              patient_name,
              address,
              time_slot,
              comment
            });
            console.log('Reserva creada exitosamente:', reservationResponse.data);
            // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
          } catch (error) {
            console.error('Error al crear la reserva:', error);
            // Manejar el error según tu flujo de aplicación
          }
        } catch (error) {
          console.error('Error al procesar el pago:', error);
          localStorage.setItem('paymentStatus', 'error');
          // Manejar el error según tu flujo de aplicación
        }
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        handleToken(); // Llama a la función para procesar el pago y crear la reserva
      };
    const handleClickCantidadMenos = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    }

    const calcularPrecio = (cantidad) => {
        switch (cantidad) {
          case 1:
            return 30;
          case 2:
            return 55;
          case 3:
            return 80;
          case 4:
            return 110;
          default:
            return 0;
        }
      };



    const handlePatientNameChange = (e) => {
        setPatientName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };


    const handleShowTelemedicina = () => {
        setShowTelemedicinaOption(true)
    }

    console.log(service)

    const saveService = async () => {
        try {
            const response = await axios.post('http://backend.doqia.es/saved_services', {
                user_id: userId,
                service_id: service.id
            });
    
            if (response.status === 201) {
                console.log('Service saved successfully:', response.data);
            } else {
                console.error('Error saving service:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleShowDomicilio = () => {
        setShowTelemedicinaOption(false)
    }

    const handleServicioSeleccionado = () => {
        const servicio = `${service.occupation} ${showTelemidicinaOption ? 'telemedicina' : 'a domicilio'}`;
        setServicioSeleccionado(servicio);
        setIsModalOpen(false)
    };

    const handleSelection = (option) => {
        setSelectedOption(option);
    };

    const handleCarrito = () => {
   setShowCarrito(true)
    }

    const createReservation = async () => {
      try {
        const response = await axios.post('http://localhost:5000/reservations', {
          client_id: userId,
          service_id: serviceId,
          type,
          patient_name,
          address,
          time_slot: `${selectedDay} ${selectedHour}:00`, // Enviamos la hora seleccionada
          comment
        });
    
        console.log('Reserva creada exitosamente:', response.data);
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        // Manejar el error según tu flujo de aplicación
      }
    };
    
    const handleShowPagar = () => {
        setPagar(true)
      }
      
      const daysOfWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sabado", "domingo"];
   
      
      const handleShowModalHorarios = () => {
        const horariosDeProfesional = service.available_times;
        setHorarios(horariosDeProfesional);
        setSelectedDay(orderedDays[0]); // Selecciona el primer día (el día actual) por defecto
        setShowModalHorarios(true);
      };
      
      const handleDayClick = (day) => {
        setSelectedDay(day);
      };
      
      const handleHourClick = (hour) => {
        setSelectedHour(hour);
      };

    const renderHours = () => {
  if (!selectedDay || !horarios) return null;

  const daySchedule = horarios.find(horario => horario.day === selectedDay);
  if (!daySchedule) return null;

  const startHour = parseInt(daySchedule.start_time.split(':')[0]);
  const endHour = parseInt(daySchedule.end_time.split(':')[0]);

  const hours = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    hours.push(hour);
  }

  return hours.map(hour => (
    <button
      key={hour}
      onClick={() => handleHourClick(hour)}
      className={`m-1 px-3 py-2 rounded-md ${selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      {hour}:00
    </button>
  ));
};
    

    return (
        <div>
            <div className='mt-[40vh]'>
                <NavBar />
            </div>
            <div className='mt-[27vh] ml-12'>
                <div className='flex gap-12'>
                    <Link to={"/"} className='flex'>
                        <img src={Flechita} className='w-[8vh] h-9 mt-2' alt="Back to Home" />
                        {pagar ? (
                            
                            <h1 className='mt-3 ml-3 text-[4vh]'>Confimar y pagar</h1>
                        ): (
                          <h1 className='mt-3 ml-3 text-[4vh]'>Perfiles</h1>
                        )}
                        
                    </Link>
                </div>

                <div className='mt-8'>
                    {loading ? (
                        <p className='text-center'>Cargando...</p>
                    ) : error ? (
                        <p className='text-center'>Error: {error}</p>
                    ) : service ? (
                        <div className='mt-4 p-4'>
                            <div className='flex'>
                                {pagar ? (
                                      <div>

                                      </div>
                                ): (
                                    <div className='flex'>
                                       {service.image_url && (
                                <img src={`http://localhost:5000/${service.image_url}`} alt={service.name} className='w-[17vh] rounded-lg h-[17vh] mb-9 ' />
                            )}
                                        <h2 className='text-[3.6vh] ml-4'>{service.username}</h2>
                                        <img src={VerifiedIcon} className='w-[4vh] h-[4vh] mt-2 ml-2' alt="" />
                                        <h1 className='mt-[5vh] ml-[-15vh]'>{service.occupation}</h1>
                                    </div>
                                )}
                               
                                {
                                    pagar ? (
                                        <div className='sm:w-[70vh] w-[52vh] ml-[-9vh] sm:ml-[120vh] bg-[#EBEBEC] mt-[35vh] sm:mt-[-16vh] sm:h-full h-[140vh] rounded-[5vh]'>
                                            <div className='flex mt-4 ml-4'>
                                            <img className="w-[15vh] h-[13vh] rounded-[200vh]" src="https://eunamed.com/wp-content/uploads/2021/02/medico-especialista-en-chile-768x512.jpg" alt="" />
                                        <h2 className='text-[3.6vh] ml-4'>{service.username}</h2>
                                <img src={VerifiedIcon} className='w-[4vh] h-[4vh] mt-2 ml-2' alt="" />
                                <h1 className='mt-[5vh] ml-[-15vh]'>{service.occupation}</h1>

                                            </div>

                                           <div >
                                           <form  onSubmit={handleSubmit}>
  {/* Campos para la reserva */}
  <div className="mb-4  w-[60vh]">
    <input
      type="text"
      id="client_id"
      value={userId}
      onChange={(e) => setClientId(e.target.value)}
      placeholder="ID del Cliente"
      className="mt-1 hidden block  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div className="mb-4">
    <input
      type="text"
      id="service_id"
      value={serviceId}
      onChange={(e) => setServiceId(e.target.value)}
      placeholder="ID del Servicio"
      className="mt-1 block hidden px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="type" className="block text-sm font-medium ml-5 text-gray-700">Tipo</label>
    <select
      id="type"
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="mt-1 block w-[50vh] ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    >
      <option value="">Seleccione el tipo</option>
      <option value="telemedicina">Telemedicina</option>
      <option value="domicilio">Domicilio</option>
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor="patient_name" className="ml-5 block text-sm font-medium text-gray-700">Nombre del Paciente</label>
    <input
      type="text"
      id="patient_name"
      value={patient_name}
      onChange={(e) => setPatientName(e.target.value)}
      placeholder="Nombre del Paciente"
      className="mt-1 block w-[50vh] ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="address" className="ml-5 block text-sm font-medium text-gray-700">Dirección</label>
    <input
      type="text"
      id="address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Dirección"
      className="mt-1 block w-[50vh] ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>
  
  <div className="mb-4">
    <div htmlFor="time_slot" onClick={handleShowModalHorarios} className="ml-5 block text-sm font-medium text-gray-700">
      Horario
    </div>
    <input
      id="time_slot"
      value={selectedHour ? `${selectedDay} ${selectedHour}:00` : ''}
      onChange={(e) => setSelectedHour(e.target.value)}
      className="mt-1 block w-[50vh] ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />

    {showModalHorarios && (
      <div className="fixed inset-0 flex sm:mt-0 mt-[-30vh] items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50 blur-lg"></div>
        <div className="relative bg-white h-[60vh] p-10 rounded-lg shadow-lg">
          <div className="w-[4vh] ml-[33vh] h-[4vh] rounded-[100vh]">
            <p className="ml-[60vh] mt-[-1.5vh]" onClick={() => setShowModalHorarios(false)}>X</p>
          </div>

          <h1 className="text-2xl text-center font-bold text-[#3F6267] xl:mt-[-3.5vh]">Selecciona un horario</h1>

          <div className="flex justify-center mb-4">
            {orderedDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={`m-1 px-4 py-2 rounded-md ${selectedDay === day ? 'bg-[#82BFD6]' : 'bg-[#82BFD6]'}`}
              >
                {day}
                <br />
                <span className="text-xs">{weekDates[index]}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center">
            {renderHours()}
          </div>

          <div className="absolute bottom-4  left-4">
            <button 
              className="px-4 py-2 bg-[#A7D2E2] text-white rounded"
              onClick={() => {
                setShowModalHorarios(false);
                createReservation(); // Llamar a la función de creación de reserva al confirmar
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>



  
  <div className="mb-4">
    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comentario</label>
    <textarea
      id="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Comentario"
      rows="3"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    ></textarea>
  </div>

  {/* Detalles del precio */}
  <h1 className="text-2xl font-bold mb-4">Detalles del Precio</h1>

  <div className="mb-4">
    <label htmlFor="cantidad" className=" ml-5 block text-sm font-medium text-gray-700">Cantidad de Personas</label>
    <input
      type="number"
      id="cantidad"
      value={cantidad}
      onChange={(e) => setCantidad(parseInt(e.target.value))}
      placeholder="Cantidad de Personas"
      min="1"
      max="4"
      className="mt-1 block w-[50vh] ml-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="precio_por_persona" className="block text-sm font-medium text-gray-700">Precio por Persona</label>
    <input
      type="number"
      id="precio_por_persona"
      value={calcularPrecio(cantidad)}
      placeholder="Precio por Persona"
      disabled
      className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
  </div>

  {/* Botón para confirmar y pagar */}
  <div className="flex items-center" onClick={createReservation}>
    <StripeCheckout
      stripeKey="pk_test_51PZ2OyGpQaucOZIPCeji7BENlnaUH9emeodQQs0SJjFRLi83TKx6mTAoYLfxY0Lwtp7kXlVJMKsB2zmKrRvVMmkL00n9ncqLh2"
      token={handleToken}
      amount={calcularPrecioTotal() * 100} // Pasa el monto total en centavos a Stripe
      currency="USD"
    />
  </div>

  {/* Mensaje de estado del pago */}
  {paymentStatus === 'success' && (
    <p className="mt-4 text-green-600 font-medium">Pago completado exitosamente.</p>
  )}
  {paymentStatus === 'error' && (
    <p className="mt-4 text-red-600 font-medium">Error al procesar el pago. Intente nuevamente más tarde.</p>
  )}
</form>
                                                                      
    </div>
    
   

                                    </div>
                                    ): (
                                        <div className='sm:w-[60vh] w-[52vh] ml-[-20vh] sm:ml-[90vh] bg-[#EBEBEC] mt-[70vh] sm:mt-[-16vh] h-[90vh] sm:h-[57vh] rounded-[5vh]'>
                                        <h1 className='text-center'>Desde <strong className='text-[4vh]'>{amount} €/h</strong></h1>
                                        <div onClick={handleModalOpen} className=' bg-white h-[8vh]  w-[50vh] ml-[5vh] mt-[6vh] rounded-[3vh]'>
                                            <h1 className='ml-3'>Servicio(s)</h1>
                                            <input type="text" value={servicioSeleccionado} placeholder='Elige tus servicios' className='ml-[2vh] text-[2.1vh] border-none focus:ring-0 focus:border-none outline-none' />
                                        </div>
                                        <div className=' bg-white h-[8vh] w-[50vh] ml-[5vh] mt-[3vh] rounded-[3vh] flex'>
                                            <h1 className='ml-3'>Fecha:</h1>
                                            <input type="text" value={fecha} onChange={(e) => {setFecha(e.target.value)}} placeholder='Ej: 10/01/2024' className='ml-[-6.8vh] h-[3vh] mt-[3.5vh] border-none focus:ring-0 focus:border-none outline-none' />
                                            <h1 className='ml-[-4vh]'>Hora:</h1>
                                            <input type="text" value={hora} onChange={(e) => {setHora(e.target.value)}} placeholder='Ej: 12:00' className='ml-[-6vh] w-[11vh] h-[3vh] mt-[3.5vh] border-none focus:ring-0 focus:border-none outline-none' />
    
                                        </div>
                                        <div className='flex ml-[2.5vh]'>
                                            <div
                                                onClick={() => handleSelection('paraMi')}
                                                className={`h-[8vh] w-[20vh] ml-[5vh] mt-[3vh] rounded-[3vh] flex ${selectedOption === 'paraMi' ? 'bg-[#82BFD6] text-white' : 'bg-white'}`}
                                            >
                                                <h1 className='ml-8 mt-3'>Para mi</h1>
                                            </div>
                                            <div
                                                onClick={() => handleSelection('unFamiliar')}
                                                className={`h-[8vh] w-[20vh] ml-[5vh] mt-[3vh] rounded-[3vh] flex ${selectedOption === 'unFamiliar' ? 'bg-[#82BFD6] text-white' : 'bg-white'}`}
                                            >
                                                <h1 className='ml-6 mt-3'>Un familiar</h1>
                                            </div>
                                        </div>
                                        <div onClick={handleCarrito} className=' bg-[#82BFD6] h-[6vh] w-[20vh] ml-[20vh] mt-[3vh] rounded-[3vh] flex cursor-pointer'>
                                            <h1 className="text-white text-[3vh] ml-4  mt-1">Ir al carrito</h1>
                                        </div>
                                        <div className=' bg-[#EBEBEC] h-[8vh] w-[60vh]  mt-[7vh] rounded-[3vh] flex'>
                                            <h1 className='ml-[20vh] mt-3'>Enviar un mensaje</h1>
                                        </div>
                                    </div>
                                    )
                                }
                                
                            </div>
                            {showCarrito ? (
                                <div>

                                
                                    {pagar ? (
                                <div className=' mt-[-178vh] sm:ml-0 ml-[-6vh]  sm:mt-[-110vh]'>
                                    <h1 className='text-[3vh] text-[#3F6267]' >¿Como funciona?</h1>
                                    <h1 className='sm:w-[100vh] w-[45vh] mb-2'>Recibe a uno de nuestros {service.occupation} en casa para una evaluación personalizada y un plan alimenticio adaptado a tus necesidades. Programa consultas de seguimiento para ajustar tu plan y asegurar tu progreso, con acceso a soporte continuo para cualquier duda. ¡Alcanza tus objetivos de salud fácilmente con nuestros expertos en nutrición! 🌱🥗</h1>
                                    <h1 className='text-[3vh] text-[#3F6267] mb-4' >Fecha y Hora</h1>
                                    <h1 className='text-[#3F6267]'>Fecha <strong className='text-black'>{fecha}</strong></h1>
                                    <h1 className='text-[#3F6267]'>Hora <strong className='text-black'>{hora}</strong></h1>
                                </div>
                                    ): (
                                        <div className='sm:mt-[-24vh] mt-[-140vh]'>
                                        <h1 className='text-[#4A696E] text-[3.5vh]'>Política de Cancelación</h1>
                                        <div className='flex'>
                                        <p className='text-[#8792A0]'>Antelación al inicio</p>
                                        <p className='text-[#8792A0] ml-[20vh]'>% de reembolso</p>
                                        </div>
                                        <div>
                                            <h1>Hasta 24 horas</h1>
                                            <h1>de 24 a 4 horas</h1>
                                            <h1>de 4 a 1 hora </h1>
        
                                        </div>
                                        <div className='ml-[40vh] mt-[-11vh]'>
                                            <h1>Cancelación gratuita</h1>
                                            <h1>75% del importe</h1>
                                            <h1>50% del importe</h1>
        
                                        <div onClick={handleShowPagar} className=' bg-[#82BFD6] ml-[-40vh] sm:ml-[40vh] h-[6vh] w-[27vh]  mt-[12vh] sm:mt-[3vh] rounded-[3vh] flex cursor-pointer'>
                                                <h1 className="text-white text-[3vh] ml-3  mt-1">confimar y pagar</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className='text-[#4A696E] text-[3vh] mt-[-23vh] sm:mt-[-8vh]'>¿Podemos ayudarte?</h1>
                                            <p>Si tienes alguna consulta o necesitas asistencia contacta con nosotros</p>
                                            <div className=' bg-[#82BFD6] h-[6vh] w-[20vh]   sm:mt-[1vh] rounded-[3vh] flex cursor-pointer'>
                                                <h1 className="text-white text-[3vh] ml-3  mt-1">contactanos</h1>
                                            </div>
                                        </div>
                                      </div>
                                    )}
                               </div>
                            ): (
                            <div className='mt-[-22vh]'>
                                <h1 className='text-[#4A696E] mb-2 sm:mt-0 mt-[-120vh] text-[3.5vh]'>Sobre mi</h1>
                                <p>{service.description}</p>
                                <p>{service.address}</p>
                                <h1 className='text-[#4A696E] mt-[3vh] text-[3.5vh]'>servicios</h1>
                                <h1>Sesión {service.occupation} a domicilio</h1>
                                <h1>Sesión {service.occupation} telemedicina</h1>
                            </div>
                               
                            )
                            }

                        </div>
                    ) : (
                        <p>No se encontró el servicio seleccionado</p>
                    )}
                </div>
            </div>
            {isModalOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="fixed bg-[#EBEBEC] w-[90%] h-[90%] rounded-lg p-8 overflow-auto">
            <div className='fixed bg-[#EBEBEC] w-[180vh] mt-[-3vh]'>
                <h2 className="text-2xl font-bold mb-4 text-[#3F6267]">Servicios de {service.username} - Número N° SNS {service.sns} - {service.occupation}</h2>
                <button onClick={saveService} className='bg-[#82BFD6] text-white w-[30vh] ml-[140vh] rounded-lg'>Guardar Selección</button>

                <div className='ml-[60vh] flex gap-6'>
                    <div>
                        <img src={SesionDomicilioTrue} onClick={handleShowDomicilio} alt="" />
                        <h1 className='mt-[-6vh] ml-[1vh] text-[1.6vh]'>{service.occupation} a domicilio</h1>
                    </div>
                    {service.occupation !== 'fisioterapeuta' && (
                        <div>
                            <img src={SesionTelemedicinaFalse} onClick={handleShowTelemedicina} alt="" />
                            <h1 className='mt-[-6vh] text-[1.6vh]'>{service.occupation} telemedicina</h1>
                        </div>
                    )}
                </div>
            </div>

            {showTelemidicinaOption ? (
                <div className='mt-[20vh] fixed'>
                    <h1 className='mt-[10vh] ml-[120vh] text-[3vh] w-[50vh] text-[#3F6267]'>{service.occupation} a domicilio por telemedicina</h1>
                    <h1 className='ml-[120vh] mt-5 text-[3vh]'>Precio: $30</h1>
                </div>
            ) : (
                <div className='mt-[20vh] fixed'>
                    <h1 className='mt-[10vh] ml-[120vh] text-[3vh] text-[#3F6267]'>{service.occupation} a domicilio</h1>
                    <h1 className='ml-[120vh] text-[#3F6267] text-[3vh]'>Precios</h1>
                    <h1 className='ml-[120vh] text-[2.5vh]'>1 persona $30</h1>
                    <h1 className='ml-[120vh] text-[2.5vh]'>2 personas $55</h1>
                    <h1 className='ml-[120vh] text-[2.5vh]'>3 Personas $80</h1>
                    <h1 className='ml-[120vh] text-[2.5vh]'>4 personas $110</h1>
                    <div className='flex'>
                        <h1 className='ml-[120vh] text-[#3F6267] text-[3vh] w-[16vh] mt-6'>{service.occupation} a domicilio</h1>
                        <h1 className='ml-[4vh] mt-[3vh] text-[2.7vh] w-[15vh]'>Precio total: {calcularPrecio()} $</h1>
                        <h1 className='mt-4 ml-[3vh] text-[2.7vh]'>Cantidad</h1>
                        <div className='flex gap-4 mt-[8vh] ml-[-12vh]'>
                            <button onClick={handleClickCantidadMenos} className='bg-[#3F6267] w-[5vh] h-[5vh] rounded-full text-white'>-</button>
                            <h1 className='mt-1'>{cantidad}</h1>
                            <button onClick={handleClickCantidadSuma} className='bg-[#3F6267] w-[5vh] h-[5vh] rounded-full text-white'>+</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-[26vh]'>
                <h4 className="text-lg font-semibold mt-[4vh] text-[#3F6267]">¿Qué incluye?</h4>
                <div className='mt-[1vh]'>
                    <ul className="list-disc list-inside ml-4 w-[120vh]">
                        <li className='w-[110vh]'>Evaluación personalizada: Nuestro experto se desplaza hasta tu casa para conocerte, entender tus hábitos y tus metas.</li>
                        <li>Plan de alimentación a medida: Creamos un plan fácil de seguir, adaptado a tus necesidades y preferencias.</li>
                        <li>Consejos prácticos: Tips y sugerencias para que logres tus metas.</li>
                    </ul>
                    {!showTelemidicinaOption && (
                        <div>
                            <h4 className="text-lg font-semibold mt-4 text-[#3F6267]">¿Por qué a domicilio?</h4>
                            <ul className="list-disc list-inside ml-4">
                                <li>Comodidad y rapidez: No necesitas desplazarte, nuestros expertos vienen a ti.</li>
                                <li>Entorno familiar: Analizamos tus hábitos y alimentos disponibles en tu propio hogar.</li>
                            </ul>
                        </div>
                    )}
                    {showTelemidicinaOption && (
                        <div>
                            <h1 className='text-[#3F6267] mt-[3vh] text-lg font-semibold'>¿Por qué por telemedicina?</h1>
                            <p className='w-[120vh] mb-6'>Para una buena sesión de {service.occupation}, la presencialidad no es necesaria. Lo esencial es la comunicación y el asesoramiento especializado. Nuestro experto te brindará la misma calidad de atención y personalización a través de una videollamada, asegurando que alcances tus objetivos de salud con el mejor apoyo.</p>
                            <p className='w-[120vh]'>¡Haz de tu bienestar una prioridad sin moverte de casa! Reserva tu sesión a domicilio hoy y da el primer paso hacia una vida más saludable y feliz. No solo cambias tu dieta, cambia tu vida 🌟</p>
                        </div>
                    )}

                    <button
                        className="mt-6 bg-[#82BFD6] text-white px-4 py-2 rounded"
                        onClick={handleModalClose}
                    >
                        Cerrar
                    </button>
                    <button
                        className="mt-6 ml-4 bg-[#82BFD6] text-white px-4 py-2 rounded"
                        onClick={handleServicioSeleccionado}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default ServicioSeleccionado;



