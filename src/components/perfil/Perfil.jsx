import React, { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import Flechita from './images/flechita.png';
import FichaMedicaImg from './images/fichaMedica.png';
import MisDocumentos from './images/misDocumentos.png';
import HistorialDeReservas from './images/historialDeReservas.png';
import Familiares from './images/familiares.png';
import Guardados from './images/guardados.png';
import MisDirecciones from './images/misDirecciones.png';
import Pagos from './images/pagos.png';
import Ayuda from './images/ayuda.png';
import CambiarProfesional from './images/cambiarProfesional.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GuardadosImg from "./images/guardadosImg.png";
import VerifierdICons from "./images/verifierdICons.png";
import FlechaFichaMedica from "./images/flechaFichaMedica.png";
import EditIcon from '@mui/icons-material/Edit';
import ImagenesSubidas from './ImagenesSubidas';
import MisFamiliares from './MisFamiliares';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {

  const [showHistorialReservas, setShowHistorialReservas] = useState(false);
  const [FichaMedica, setFichaMedica] = useState(false);
  const [historialDeReservas, setHistorialDeReservas] = useState([]);
  const [guardados, setGuardados] = useState([]);
  const [showGuardados, setShowGuardados] = useState(false);
  const [compartirFichaMedica, setCompartirFichaMedica] = useState(false)
  const [citas, setCitas] = useState([])
  const [showmisDocumentos, setShowMisDocumentos] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [familiares, setFamiliares] = useState(false)
  const [nombreFamiliar, setNombreFamiliar] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [clienteOProfesional, setClienteOProfesional] = useState()
  
  
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userId = user.id;
  
  const navigate = useNavigate();
  useEffect(() => {
    setClienteOProfesional(user.is_client)
   if (user.is_client === false) {
      navigate(`/perfil/profesional/${userId}`)
   }
  }, [])

  const [medicalInfo, setMedicalInfo] = useState({
    nombre: '',
    edad: '',
    peso: '',
    altura: '',
    sexo: "",
    alergias_alimentarias: "",
    historial_familiar: "",
    medicamentos_actuales: "",
    vacunas: ""
  });


  const [editField, setEditField] = useState('');


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalInfo({ ...medicalInfo, [name]: value });
  };

  const handleCloseClick = () => {
    setShowHistorialReservas(false);
    setShowMisDocumentos(false);
    setShowGuardados(false);
    setFichaMedica(false);
    setCompartirFichaMedica(false);
    setFamiliares(false)
  };


  
  useEffect(() => {
    const api = async () => {
        try {
            const getReservaciones = await axios.get(`http://localhost:5000/users/${userId}/reservations`);
            const getGuardados = await axios.get(`http://backend.doqia.es/users/${userId}/saved_services`);
            const getMedicalInfo = await axios.get(`http://backend.doqia.es/users/${userId}/medical_info`);
            const citas = await axios.get(`http://localhost:5000/users/${userId}/client_reservations`);
            
            
            setMedicalInfo({
                nombre: getMedicalInfo.data.nombre,
                edad: getMedicalInfo.data.edad,
                peso: getMedicalInfo.data.peso,
                sexo: getMedicalInfo.data.sexo,
                altura: getMedicalInfo.data.altura,
                alergias_alimentarias: getMedicalInfo.data.alergias_alimentarias,
                historial_familiar: getMedicalInfo.data.historial_familiar,
                medicamentos_actuales: getMedicalInfo.data.medicamentos_actuales,
                vacunas: getMedicalInfo.data.vacunas
            });

            setCitas(citas.data)
            setGuardados(getGuardados.data);
            setHistorialDeReservas(getReservaciones.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    api();
}, [userId]);



const citasFilter = citas.length > 0 ? citas.filter(cita => cita.accept === true) : [];

console.log(medicalInfo)

  const handleFichaMedicaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://backend.doqia.es/users/${userId}/medical_info`, medicalInfo);
      setFichaMedica(false);
      setCompartirFichaMedica(true)
      setEditField('');
    } catch (error) {
      console.error('Error updating medical info:', error);
      alert('Hubo un error al actualizar la información médica');
    }
  };

  const showFichaMedica = () => {
    setFichaMedica(true);
  };

  const showMisDocumentoss = () => {
    setShowMisDocumentos(true)
  }

  const handleSubmitFamiliar = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      // Enviar los datos del nuevo familiar al servidor
      const response = await axios.post(`http://backend.doqia.es/users/${userId}/familiares`, {
        nombre: nombreFamiliar,
        parentesco: parentesco,
      });

      console.log(response.data); // Mensaje de éxito del servidor

      // Limpiar el formulario después de agregar el familiar
      setNombreFamiliar('');
      setParentesco('');

      // Puedes manejar aquí la actualización de la lista de familiares si es necesario
    } catch (error) {
      console.error('Error al agregar familiar:', error);
    }
  };

  const showHistorial = () => {
    setShowHistorialReservas(true);
  };

  const handleClickGuardados = () => {
    setShowGuardados(true);
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };


  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('description', description);

    try {
      const response = await axios.post(`http://backend.doqia.es/users/${userId}/upload_image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      setMessage(response.data.message);
      setImageUrl(response.data.image_url);
    } catch (error) {
      setMessage(error.response.data.message || 'Error uploading image');
    }
  };

 const showFamiliares = () => {
    setFamiliares(true)
 }

  const altura = parseFloat(medicalInfo.altura);
const pesoIdeal = 21.75 * (altura * altura);
const soloDosDigitos = pesoIdeal.toFixed(0).slice(0, 2);
  
  return (
    <div>
      <div className='mt-[40vh]'>
        <NavBar />
      </div>
 
      <div className=' mt-[27vh]  ml-12'>
        <div className='flex gap-12'>
          <Link to={"/"}>
            <img src={Flechita} className='w-[8vh] h-9 mt-2'/>
          </Link>
          <h1 className='text-[#3F6267] text-[5vh]'>Hola!, {user.username}</h1>
        </div>
      
        
        <div >
          <h1 className='text-[#8792A0] text-[4vh] mt-6'>Perfil</h1>
          <img src={FichaMedicaImg} onClick={showFichaMedica} />
          <div className='mt-[-40vh] sm:mt-0'>
          <p className='mt-[21vh] sm:mt-[-26vh] sm:fixed ml-[12vh] sm:ml-[16vh]'>{soloDosDigitos}Kg</p>
          <p className='mt-[1vh] sm:mt-[-19.8vh] sm:fixed  ml-[18vh] sm:ml-[25vh] text-[2.3vh]'>{medicalInfo.edad}</p>
          <p className='  sm:mt-[-15.5vh] sm:fixed ml-[18vh] sm:ml-[25vh] text-[2.3vh]'>{medicalInfo.altura}</p>
          <p className='sm:mt-[-12vh] mt-[-1vh] sm:fixed ml-[17vh] sm:ml-[19vh] text-[2.3vh]'>{medicalInfo.sexo}</p>
          </div>
      </div>
  <div className='z-20000 mt-[10vh] xl:h-[20vh]  sm:mt-[-40vh] w-[40vh] xl:w-[90vh] ml-[-3vh] sm:ml-[50vh] items-center text-center flex flex-wrap gap-4'>
            <img src={MisDocumentos}  onClick={showMisDocumentoss}/>
            <img src={HistorialDeReservas} onClick={showHistorial} />
            <img src={Familiares} onClick={showFamiliares} />
            <img src={Guardados} onClick={handleClickGuardados}/>
          </div>
          <div>
   
          </div>
      {showHistorialReservas && (
        <div className="fixed inset-0 bg-black sm:mt-0 mt-[-20vh] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[44.9vh] sm:w-[85vh] text-center h-[80vh] relative overflow-y-auto">
            <h2 className="text-2xl bg-white text-[#3F6267] sm:text-[6.5vh] mb-4">Historial de Reservas</h2>
            <div className="relative">
              <button onClick={handleCloseClick} className="absolute top-2 right-2 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[-5vh] rounded-full">
                &times;
              </button>
            </div>            
            {historialDeReservas.map((reserva) => (
              <div key={reserva.id} className="border text-[#3F6267] ml-[-4vh] sm:ml-5 text-[2vh] rounded-[8vh] w-[46vh] sm:w-[70vh] bg-[#EBEBEC] p-4 mb-4 text-left">
                <div className='bg-[#82BFD6] w-[30vh] sm:w-[55vh]  ml-12 sm:ml-7 mt-[-1.8vh] sm:mt-[-2.5vh] mb-2 h-2 rounded-[10vh]'></div>
                <div className='text-white bg-[#82BFD6] w-[15vh] sm:w-20 text-center rounded-[4vh] overflow-hidden sm:ml-[50vh]'>{reserva.type}</div>
                <p className='flex items-center mb-2'><strong className='mr-[17vh]'>Dirección</strong>{reserva.address}</p>
                <p className='flex items-center mb-2'><strong className='mr-[14.5vh]'>Comentario</strong> {reserva.comment}</p>
                <p className='flex items-center mb-2'><strong className='mr-[5.4vh]'>Nombre del paciente</strong> {reserva.patient_name}</p>
                <p className='flex items-center mb-2'><strong className='mr-[7vh]'>Fecha de la reserva</strong> {new Date(reserva.reservation_date).toLocaleString()}</p>
                <p className='flex items-center mb-2'><strong className='mr-4'>Descripción del servicio</strong> {reserva.service_description}</p>
                <p className='flex items-center mb-2'><strong className='mr-4'>Hora</strong> {reserva.time_slot}</p>
               <div className="bg-[#EBEBEC] rounded-[7vh] sm:w-24 sm:mt-0 mt-[-3vh] h-5 ml-[23vh]">Cancelar Sesion</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showGuardados && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:mt-0 mt-[-20vh] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[85vh] text-center h-[80vh] relative overflow-y-auto">
            <h2 className="text-2xl bg-white text-[#3F6267] text-[6.5vh] mb-4">Guardados</h2>
            <div className="relative">
              <button onClick={handleCloseClick} className="absolute top-2 right-2 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[-5vh] rounded-full">
                &times;
              </button>
            </div>            
            {guardados.map((guardado) => (  
              <div key={guardado.id} className="border z-34 text-[#3F6267] ml-[-1vh] sm:ml-5 text-[2vh] rounded-[3vh] w-[43vh] sm:w-[70vh] h-[28vh] bg-[#EBEBEC] p-4 mb-4 text-left">
                <img src={GuardadosImg} className='w-16 sm:mt-0 mt-4' alt="" />
                <p className='flex items-center mb-2 mt-[-7vh] ml-[-5vh] text-[2.5vh]'><strong className='mr-[17vh]'></strong>{guardado.username}</p>
                <img src={VerifierdICons} className='w-12 mt-[-8vh] ml-[12vh]' alt="" />
                <p className='ml-[12vh] mt-6 sm:mt-4'>{guardado.service_occupation}</p>
                <p className='text-[#496A6E] ml-1 mt-3'>sobre mi</p>
                <p className='ml-1'>{guardado.service_description}</p>
                <p className='sm:ml-[50vh] ml-[25vh] mt-[-20vh] sm:mt-[-16vh]'>Desde <strong>25 €/h</strong></p>

</div>
))}
</div>
</div>
)}   {FichaMedica && (
  <div className="fixed inset-0 bg-black sm:mt-0 mt-[-20vh] bg-opacity-50 flex items-center justify-center z-50 border-b-0">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[46vh] sm:w-[85vh] text-center h-[80vh] relative overflow-y-auto">
      <h2 className="sm:text-2xl text-xl sm:mt-0 mt-1 text-[#3F6267] text-[6.5vh] mb-4">Ficha Médica</h2>
      <div className="relative">
        <button onClick={handleCloseClick} className="absolute top-2 right-2 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[-5vh] rounded-full">
          &times;
        </button>
      </div>
      <img src={FlechaFichaMedica} className='w-24 ml-[15vh] sm:ml-[30vh]' alt="" />
      <h1>{medicalInfo.edad} años</h1>
      <p className='text-[1.8vh] mt-3 sm:w-[74vh] '>Es importante que completes todos los campos. Mantener tu información médica ordenada y centralizada es crucial para gestionar tu salud de manera efectiva y facilitar diagnósticos precisos. ¡Comienza hoy!</p>
      <p className='text-[1.7vh] text-[#656870] mt-3 '>*Puedes compartir tu historial médico con el profesional que desees o descargarlo y enviarlo a profesionales externos a Doqia.</p>
      <p className='text-[1.9vh] text-[#3F6267] mt-3 ml-[-60vh] '>perfil del Paciente</p>
      <form onSubmit={handleFichaMedicaSubmit} className='text-[2vh]'>
      {Object.keys(medicalInfo).map((key) => (
        <div key={key} className="mb-4">
          
    {['historial_familiar', 'medicamentos_actuales', 'vacunas', 'alergias_alimentarias'].includes(key) ? (
    
      <div className='mb-[-35vh] sm:mb-[-8vh] mt-[-3vh] h-[40vh] sm:h-[5vh] flex items-center justify-between'>
        <span className="text-[2vh]">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}:</span>
        <input
          name={key}
          value={medicalInfo[key]}
          onChange={handleInputChange}
          className="p-2 ml-2 h-10 border border-gray-300 rounded"
        />
      </div>
     
    ) : (
      <div >
        {editField === key ? (
          <div>
            <input
              type="text"
              name={key}
              value={medicalInfo[key]}
              onChange={handleInputChange}
              className="p-2 ml-[-38vh] h-6 border border-gray-300 rounded"
            />
            <button type="button" onClick={() => setEditField('')} className="ml-2 p-2 bg-red-500 h-8 text-white rounded">Cancelar</button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[2vh]">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}: <span className='ml-[1vh]'>{medicalInfo[key]}</span></span>
            <EditIcon onClick={() => handleEditClick(key)} className="ml-2 mt-[-1vh] text-[#3F6267] "/>
          </div>
        )}
      </div>
    )}
  </div>
))} 
<h1 className='mt-[-45vh] ml-[-60vh] text-[#3F6267]'>Historial Medico</h1>

        <button type="submit" className="p-1 mt-[23vh] sm:mt-[47vh] bg-[#3F6267] text-white rounded">compartir</button>
      </form>

 <form>

 </form>
    </div>
  </div>
)}

{compartirFichaMedica && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[85vh] text-center h-[80vh] relative overflow-y-auto">
            <h2 className="text-2xl bg-white text-[#3F6267] text-[6.5vh] mb-4">Cita</h2>
            <div className="relative">
              <button onClick={handleCloseClick} className="absolute top-2 right-2 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[-5vh] rounded-full">
                &times;
              </button>
            </div>            
            {citasFilter.map((cita) => (
              <div key={cita.id} className="border z-34 text-[#3F6267] ml-5 text-[2vh] rounded-[3vh] w-[70vh] h-[20vh] bg-[#EBEBEC] p-4 mb-4 text-left">
                <img src={GuardadosImg} className='w-16' alt="" />
                <p className='flex items-center mb-2 mt-[-7vh] ml-[-5vh] text-[2.5vh]'><strong className='mr-[17vh]'></strong>{cita.service_description}</p>
              <p className='ml-[12vh] mt-4'>{cita.time_slot}
              </p>
</div>
))}
<img className='w-24 ml-[30vh]' src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=360/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" alt="" />
<h1 className='text-[#3F6267]'>compartido correctamente a tus cita </h1>
</div>
</div>
)}

{showmisDocumentos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center sm:mt-0 mt-[-20vh] justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[85vh] text-center h-[80vh] relative overflow-y-auto">
            <h2 className="text-2xl sm:mt-0 mt-[3vh] bg-white text-[#3F6267] text-[6.5vh] mb-4">Mis Documentos</h2>
            <div  >
              <button onClick={handleCloseClick}  className="absolute top-2 right-3 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[5vh] rounded-full">
                &times;
              </button>
          <ImagenesSubidas />
            </div>       
          
                
</div>
</div>
)}

{familiares && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center sm:mt-0 mt-[-20vh] justify-center z-50">
         <div className="bg-white p-6 rounded-xl shadow-lg w-[85vh] text-center h-[80vh] relative overflow-y-auto">
           <h2 className="text-2xl bg-white text-[#3F6267] sm:mt-0 mt-10 text-[6.5vh] mb-4">Mis Familiares</h2>
           <div  >
             <button onClick={handleCloseClick}  className="absolute top-2 right-3 flex items-center justify-center text-xl bg-[#82BFD6] w-6 h-6 mt-[5vh] rounded-full">
               &times;
             </button>
        <MisFamiliares />
           </div>       
         
               
</div>
</div>
)}
</div>

</div>
);
};

export default Perfil;
