import React, { useState } from 'react';
import NavBar from './navbar/NavBar';
import Raya from "../../images/raya.png";
import Casita from "../../images/casa.png";
import Calendario from "../../images/calendario.png";
import Comodidad from "../../images/comodidad.png";
import Seguridad from "../../images/seguridad.png";
import emailjs from 'emailjs-com';

import Calidad from "../../images/calidad.png";
import SeleccionaProfesional from "../../images/selecionaProfesonal.png";
import AgendarClick from "../../images/agendarClick.png";
import Almacena from "../../images/alamaneca.png";
import Deporte2 from "../../images/deporte2.png";
import Nutricion2 from "../../images/nutricion2.png";
import Psicologia2 from "../../images/psicologia2.png";
import Fisioterapia2 from "../../images/fisioterapia2.png";
import MedicinaGeneral2 from "../../images/medicinaGeneral2.png"
import Lucia from "../../images/lucia.png"
import David from "../../images/david.png"
import Jose from "../../images/jose.png"
import ContactarMuneco from "../../images/contactarMuneco.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [showDeporteInfo, setShowDeporteInfo] = useState(false);
  const [showFisioterapiaInfo, setShowFisioterapiaInfo] = useState(false);
  const [showPsicologiaInfo, setShowPsicologiaInfo] = useState(false);
  const [showNutricionInfo, setNutricionInfo] = useState(false);
  const [showMedicinaGeneral, setMedicinaGeneral] = useState(false)
  const [agendaOption, setAgendaOption] = useState("")
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [selectedOption, setSelectedOption] = useState("")
  const [showModalDomicilioOTelemedicina, setShowModalDomicilioOTelemedicina] = useState(false)
  
  const navigate = useNavigate()
  
  const handleDeporteClick = () => {
    setShowDeporteInfo(true);
  };
  
  const handleShowNutricionClick = () => {
    setNutricionInfo(true);
  };
  const handleMedicinaGeralClick = () => {
    setMedicinaGeneral(true)
  }

  const handleShowModalDomicilioOTelemedicina = (option) => {
          setSelectedOption(option)
          setShowModalDomicilioOTelemedicina(true)
          setShowDeporteInfo(false)
          setShowFisioterapiaInfo(false)
          setShowPsicologiaInfo(false)
          setNutricionInfo(false)
          setMedicinaGeneral(false)
  }

  const handleFisioterapiaClick = () => {
    setShowFisioterapiaInfo(true);
  };

  const handlePsicologiaClick = () => {
    setShowPsicologiaInfo(true);
  };

  const handleCloseClick = () => {
    setShowDeporteInfo(false);
    setShowFisioterapiaInfo(false);
    setShowPsicologiaInfo(false);
    setNutricionInfo(false)
    setMedicinaGeneral(false)
  };
  
  const handleAgendarOption = (option) => {
    setAgendaOption(option)
    setShowDeporteInfo(false);
    setShowFisioterapiaInfo(false);
    setShowPsicologiaInfo(false);
    setNutricionInfo(false);
    setMedicinaGeneral(false);
  }

  
    const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_38yntgo';
    const templateID = 'template_x3v1we1';
    const publicKey = 'JnX6XRPS2xr7ItipP';

    const templateParams = {
      from_name: nombre,
      from_email: email,
      phone_number: telefono,
      message: mensaje,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.error('FAILED...', error);
      });

    // Clear form fields after submission
    setNombre('');
    setEmail('');
    setTelefono('');
    setMensaje('');
  };

  
  const handleBuscarServicio = (a) => {
    const servicio = selectedOption;
    navigate(`/${"Barcelona"}/${servicio}`);


  }

  return (
    <div className=''>
      <div style={{ position: "fixed", zIndex: "500", marginTop: "-3vh" }} className='w-full'>
        <NavBar agendaOption={agendaOption} />
      </div>

      <div className="text-center  text-[#3F6267] mt-[43vh] overflow-x-hidden">
        <h1 className="text-[8vh] mt-[12vh]">Salud de calidad desde la comodidad de tu hogar</h1>
        <img src={Casita} className="sm:block hidden w-[25vh] mt-[-16vh] ml-[170vh]" />
        <img src={Raya} className="hidden sm:block w-[30vh] ml-[50vh] mt-[8vh]" />
      </div>

      <div className="flex items-center  mt-[-25vh] justify-center h-screen text-[#737373]">
       
       
      </div>

      <div className="mt-[-20vh] text-center">
        <h1 className="text-[#3F6267] text-[6vh]">¿Porque Doqia?</h1>
      </div>

      <div className="flex justify-center items-center sm:mt-0 mt-[-24vh] text-center gap-52 ml-[-56vh] sm:ml-[-10vh] ">
        <div className='sm:ml-24 ml-[66vh]'>
          <img src={Comodidad} className="mt-[-24vh] w-[20vh] sm:w-[25vh] sm:mt-24" alt="" />
          <h1 className='text-[4vh] ml-[-7vh] text-[#3F6267]'>Comodidad</h1>
          <p className='text-[#545454] ml-[-7vh] sm:ml-[-4vh] w-[35vh]'>Sin filas de espera, rápido y en la comodidad de tu hogar.</p>
        </div>
        <div className='ml-[-62vh] sm:ml-0'>
          <img src={Seguridad} className="mt-[35vh] sm:mt-24 sm:w-[20vh] w-[18vh]  ml-[11vh] sm:ml-2" alt="" />
          <h1 className='text-[4vh] ml-[2vh] sm:ml-[-7vh] text-[#3F6267]'>Seguridad</h1>
          <p className='text-[#545454] ml-[1vh] sm:ml-[-4vh] w-[35vh]'>Información y datos almacenados con seguridad.</p>
        </div>
        <div className='ml-[-53vh] sm:ml-0 sm:mt-0 mt-[75vh]'>
          <img src={Calidad} className="sm:mt-24 mt-[24vh] sm:w-[20vh] w-[18vh] sm:ml-2 ml-9" alt="" />
          <h1 className='text-[4vh] ml-[-7vh] text-[#3F6267]'>Calidad</h1>
          <p className='text-[#545454] ml-[-6vh] sm:ml-[-4vh] w-[35vh]'>Profesionales de confianza, verificados y calificados.</p>
        </div>
      </div>

      <div className='mt-32 ml-16 '>
        <h1 className='text-[6vh] text-[#3F6267] ml-[-6vh] text-center'>¿Cómo funciona?</h1>
        <div className='flex justify-center sm:mt-0 mt-[-80vh] sm:mt-18 items-center text-center gap-32 sm:ml-[-10vh] ml-[-113vh]'>
          <div className='sm:ml-0 ml-[118vh]'>
            <img src={SeleccionaProfesional} className='sm:ml-16 ml-[-2vh] w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] sm:ml-0 ml-[-13vh] text-[4vh] w-[45vh]'>Encuentra al profesional que necesitas</h1>
            <p className='text-[#545454] ml-[-10vh] sm:ml-[2vh] mt-4 w-[40vh]'>Encuentra fisioterapeutas, psicólogos, nutricionistas y más!.</p>
          </div>
          <div className='sm:mt-0 mt-[80vh] sm:ml-0 ml-[-60vh]'>
            <img src={AgendarClick} className='ml-16 w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] text-[4vh] w-[45vh]'>Agenda con 1 click</h1>
            <p className='text-[#545454] ml-[2vh] mt-4 w-[40vh]'>Solicita al profesional que necesites en 1 solo clic.</p>
          </div>
          <div className='sm:mt-10 mt-[175vh] sm:ml-0 ml-[-60.4vh]'>
            <img src={Almacena} className='ml-16 w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] text-[4vh] w-[45vh] '>Almacena y comparte tus informes médicos</h1>
            <p className='text-[#545454] ml-[2vh] mt-4 w-[40vh]'>Almacena tus informes médicos y compártelos con el profesional que desees para una atención personalizada a tus necesidades.</p>
          </div>
        </div>
      </div>

      <div className='mt-24'>
        <h1 className='sm:text-[6vh]  text-[2.3vh]  text-[#3F6267] ml-[-1vh] sm:ml-[-6vh] text-center'>Nuestros Servicios ¡Haz Clic y Conoce Más!</h1>
        <div className='flex justify-center mt-24 items-center text-center flex-wrap gap-32 ml-[1vh]'>
          <img src={Deporte2} className='w-[30vh]' alt="" onClick={handleDeporteClick} />
          <img src={Nutricion2} className='w-[30vh]'  alt="" onClick={handleShowNutricionClick}/>
          <img src={Psicologia2} className='w-[30vh]'  alt="" onClick={handlePsicologiaClick} />
          <img src={Fisioterapia2} className='w-[30vh]'  alt="" onClick={handleFisioterapiaClick}/>
          <img src={MedicinaGeneral2}  className='mt-[-8vh] w-[30vh]' alt="" onClick={handleMedicinaGeralClick}/>
        </div>
      </div>

      {showDeporteInfo && (
 <div style={{ position: "fixed", zIndex: "1000" }} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
    <div className="bg-white p-8 rounded-lg w-[50vh] sm:w-[90vh] sm:h-[90vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll">
      <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
      <h1 className="text-3xl text-center font-bold mb-4 text-[#3F6267]">Deporte</h1>
      <p className="mb-4">Nuestros entrenadores expertos están disponibles para sesiones a domicilio y a través de videollamada, brindándote la comodidad y flexibilidad que necesitas para mantenerte saludable y en forma.</p>
      <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión de Entrenamiento a domicilio </h3>
      <div className='mt-[1vh]'>
        <h3 className="text-xl font-semibold mb-2">¿Qué incluye?</h3>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada de tu condición física y objetivos.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Plan de entrenamiento a medida, adaptado a tus necesidades, objetivos y a tu entorno.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Consejos prácticos para optimizar tu rutina de ejercicios y mantenerte motivado.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Acompañamiento y corrección de posturas y ejercicios.</p>
        <h3 className="text-md font-semibold mb-2">Las sesiones pueden ser llevadas a cabo en el domicilio, videollamada o al aire libre (parque o explanada).</h3>
      </div>
      <h3 className="text-[3vh] font-semibold mb-2 mt-4 text-[#3F6267]">Sesión de Entrenamiento por Telemedicina:</h3>
      <h3 className="text-xl font-semibold mb-2">¿Qué incluye?</h3>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada de tu condición física y objetivos.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Plan de entrenamiento a medida, adaptado a tus necesidades y objetivos.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Consejos prácticos para optimizar tu rutina de ejercicios y mantenerte motivado.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Acompañamiento y corrección de posturas y ejercicios en tiempo real.</p>
      <h3 className="text-xl font-semibold mb-2 mt-4">¿Por qué por Telemedicina?</h3>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Acceso inmediato: Entrena desde cualquier lugar con acceso a internet.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Flexibilidad: Elige horarios que se adapten a tu rutina diaria.</p>
      <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Eficiencia: Sin necesidad de desplazamientos, optimizas tu tiempo y puedes recibir atención experta desde la comodidad de tu hogar.</p>
        <div onClick={() => handleShowModalDomicilioOTelemedicina("entrenador")} className='bg-[#F3F2F7]  w-[20vh] h-[6vh]  mt-[2vh] sm:mt-[6vh]  text-center text-[#3F6267] rounded-[10vh] ml-[10vh] sm:ml-[30vh]'>
          <h1 className='text-xl '> 
          Agenda Ya
          </h1>
        </div>
    </div>
  </div>
)}
        
        {showModalDomicilioOTelemedicina && (
  <div style={{ position: "fixed", zIndex: "1000" }} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
    <div className="bg-white p-8 rounded-lg w-[50vh] xl:w-[50vh] sm:h-[90vh] xl:h-[50vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll">
      <button className="text-red" onClick={() => { setShowModalDomicilioOTelemedicina(false) }}>X</button>
      <h1 className="text-center text-blue-400">¿Qué opción quieres elegir?</h1>
      <h1 className="text-center text-[2.8vh]">{selectedOption}</h1>
      <div className="flex flex-col items-center mt-6 space-y-4">
        <button 
          className={`w-40 py-2 ${selectedOption === 'Telemedicina' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none`}
        >
          Telemedicina
        </button>
        <button 
          className={`w-40 py-2 ${selectedOption === 'Domicilio' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none`}
        >
          Domicilio
        </button>
        <button 
          className="w-40 py-2 bg-blue-400 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleBuscarServicio}
        >
          Buscar
        </button>
      </div>
    </div>
  </div>
)}


      
       

        {showFisioterapiaInfo && ( <div style={{ position: "fixed", zIndex: "1000" }} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] sm:h-[90vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll">
            <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
            <h1 className="text-3xl text-center font-bold mb-4 text-[#3F6267]">Fisioterapia</h1>
            <p className="mb-4">Nuestros fisioterapeutas expertos están disponibles para sesiones a domicilio, brindándote la comodidad y flexibilidad que necesitas para tu rehabilitación y cuidado físico.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión nutricional a Domicilio   </h3>
           <div className='mt-[1vh]'>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada de tu condición física </p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>necesidades terapéuticas en la comodidad de tu hogar.Sesión de fisioterapia según necesidades</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Tercera edad y personas postradas: mejorar movilidad, reducir dolor crónico y aumentar la calidad de vida. Ejercicios específicos para mejorar fuerza, equilibrio y coordinación..</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Rehabilitación de lesiones: Técnicas manuales y ejercicios terapéuticos para aliviar dolor y mejorar flexibilidad</p>

          <div onClick={() => handleShowModalDomicilioOTelemedicina("fisioterapeuta")} className='bg-[#F3F2F7]   w-[20vh] h-[6vh] mt-[5vh] text-center text-[#3F6267] rounded-[10vh] ml-[10vh] sm:ml-[28vh]'>
            <h1 className='text-xl mt-[5vh] '> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>)}

        {showPsicologiaInfo && (
  <div
    style={{ position: "fixed", zIndex: "1000" }}
    className="fixed top-0 left-0 w-full h-full overflow-y-scroll overflow-x-hidden bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]"
  >
    <div className="bg-white p-8 rounded-lg w-[90vh] sm:h-[95vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll overflow-x-hidden">
      <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">
        &times;
      </button>
      <h1 className="text-3xl text-center font-bold mb-4 text-[#655F7D]">Psicologia</h1>
      <p className="mb-4">
        Nuestros psicólogos expertos están aquí para apoyarte, ya sea en la comodidad de tu hogar o a través de telemedicina. Entendemos lo importante que es tu bienestar emocional, por eso te ofrecemos la comodidad y flexibilidad que necesitas para recibir el cuidado que mereces.
      </p>
      <h3 className="text-xl font-semibold mb-2 text-[#655F7D]">
        Sesiónes a Domicilio (individual o grupal) y Telemedicina
      </h3>
      <div className='mt-[1vh]'>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia individual: Sesiones personalizadas para abordar problemas específicos como ansiedad, depresión, estrés, etc.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia de pareja: Mejora de la comunicación y resolución de conflictos</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia familiar: Intervenciones para mejorar las dinámicas familiares y resolver conflictos. Apoyo para familias que enfrentan problemas como divorcio, enfermedad, o pérdida.</p>
      </div>
        <div  onClick={() => handleShowModalDomicilioOTelemedicina("psicologo")} className='bg-[#F3F2F7]  w-[20vh] fixed h-[6vh] mt-[-14vh] sm:mt-[12vh] text-center text-[#655F7D] rounded-[10vh] ml-[11vh] sm:ml-[28vh]'>
          <h1 className='text-xl '> 
            Agenda Ya
          </h1>
        </div>
      <p className="mt-[1vh] mb-8"><span className='text-[8vh]'>.</span>Terapia niños y adolescentes: Tratamiento de problemas emocionales y conductuales en jóvenes. Apoyo en temas como bullying, ansiedad escolar, y desarrollo emocional.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Coaching de vida y bienestar: Orientación para alcanzar metas personales y profesionales. Estrategias para mejorar la autoestima, la motivación y el bienestar general.</p>
      <div className='flex ml-[-28vh] sm:mt-0 mt-[-8vh] sm:ml-[-22vh]'>
        <div className='bg-[#F3F2F7] w-[30vh] sm:w-[20vh] h-[6vh] mt-[12vh] text-center text-[#655F7D] rounded-[10vh] ml-[28vh]'>
          <h1 className='text-xl '> 
            Domicilio
          </h1>
        </div>
        <div className='bg-[#F3F2F7] w-[35vh] sm:w-[20vh] h-[6vh] mt-[12vh] text-center text-[#655F7D] rounded-[10vh] ml-[3vh] sm:ml-[28vh]'>
          <h1 className='text-xl '> 
            Telemedicina
          </h1>
        </div>
      </div>
      <div className='flex flex-wrap ml-[-30vh] mt-[-6vh] w-[130vh]'>
        <div className='bg-[#F3F2F7] w-[20vh] sm:w-[35vh] h-[6vh] mt-[12vh] text-center text-[#655F7D] rounded-[10vh] ml-[28vh]'>
          <h1 className='text-xl '> 
            Terapia individual
          </h1>
        </div>
        <div className='bg-[#F3F2F7] w-[20vh] sm:w-[35vh] h-[6vh] mt-[12vh] text-center text-[#655F7D] rounded-[10vh] ml-[2vh] sm:ml-[13vh]'>
          <h1 className='text-xl '> 
            Terapia de pareja
          </h1>
        </div>
        <div className='bg-[#F3F2F7] w-[18vh] sm:w-[35vh] h-[6vh] mt-[22vh] sm:mt-[6vh] text-center text-[#655F7D] rounded-[10vh] ml-[-40vh] sm:ml-[28vh]'>
          <h1 className='text-xl '> 
            Terapia familiar
          </h1>
        </div>
        <div className='bg-[#F3F2F7] w-[22vh] sm:w-[35vh] h-[6vh] mt-[22vh] sm:mt-[6vh] text-center text-[#655F7D] rounded-[10vh] ml-[1vh] sm:ml-[13vh]'>
          <h1 className='text-xl '> 
            Niños y adolescentes
          </h1>
        </div>
        <div className='bg-[#F3F2F7] w-[35vh] h-[6vh]  mb-[5vh] mt-[2vh] text-center text-[#655F7D] rounded-[10vh] ml-[33vh] sm:ml-[50vh]'>
          <h1 className='text-xl '> 
            Coaching de bienestar
          </h1>
        </div>
      </div>
    </div>
  </div>
)}

        {showNutricionInfo && (  <div style={{ position: "fixed", zIndex: "1000" }} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] sm:h-[90vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll">
            <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
            <h1 className="text-3xl text-center font-bold mb-4 text-[#516454]">Nutricion</h1>
            <p className="mb-4">Servicios de nutrición diseñados para ayudarte a alcanzar tus metas de salud y bienestar. 
Nuestros nutricionistas expertos están disponibles para consultas a domicilio y a través de telemedicina, brindándote la comodidad y flexibilidad que necesitas.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión nutricional a Domicilio (individual o grupal) </h3>
           <div className='mt-[1vh]'>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada analizando tus hábitos y alimentos disponibles en tu propio hogar.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Plan de alimentación a medida.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Consejos prácticos.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión nutricional por Telemedicina</h3>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada, estés donde estés.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Plan de alimentación a medida, directo a tu pantalla.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Consejos prácticos.</p>
          <div onClick={() => handleShowModalDomicilioOTelemedicina("nutricionista")}   className='bg-[#F3F2F7]  w-[20vh] h-[6vh] mt-[5vh] text-center text-[#516454] rounded-[10vh] ml-[10vh] sm:ml-[28vh]'>
            <h1 className='text-xl mt-[5vh] '> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>)}

        {showMedicinaGeneral && (
  <div style={{ position: "fixed", zIndex: "1000" }} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
    <div className="bg-white p-8 rounded-lg w-[90vh] sm:h-[90vh] h-[68vh] sm:mt-0 mt-[-33vh] max-w-4xl relative overflow-y-scroll">
      <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
      <h1 className="text-3xl text-center font-bold mb-4 text-[#760E16]">Medicina General</h1>
      <p className="mb-4">Nuestros médicos expertos están disponibles para consultas a domicilio y a través de telemedicina, brindándote la comodidad y flexibilidad que necesitas.</p>
      <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Atención médica a Domicilio:</h3>
      <div className='mt-[1vh]'>
        <h3 className="text-xl font-semibold mb-2">¿Qué incluye?</h3>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Consulta médica a domicilio.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación completa y personalizada en la comodidad de tu hogar.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Diagnóstico y tratamiento inmediato.</p>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Recetas y recomendaciones adaptadas a tu entorno.</p>
        <h3 className="text-xl text-[#3F6267] font-semibold mb-4">Atención médica por Telemedicina:</h3>
        <h3 className="text-xl font-semibold mt-[-2vh] mb-5">¿Qué incluye?</h3>
        <p className="mt-[-9vh]"><span className='text-[8vh]'>.</span>Acceso a un médico experto desde cualquier lugar.</p>
        <p className="mt-[-9vh]"><span className='text-[8vh]'>.</span>Evaluación y diagnóstico personalizado.</p>
        <p className="mt-[-9vh]"><span className='text-[8vh]'>.</span>Recetas electrónicas y seguimiento continuo.</p>
        <div  onClick={() => handleShowModalDomicilioOTelemedicina("medico")} className='bg-[#F3F2F7]  w-[20vh] fixed h-[6vh] sm:mt-[1vh]  mt-[-22vh] text-center text-[#3F6267] rounded-[10vh] ml-[10vh] sm:ml-[28vh]'>
          <h1 className='text-xl '> 
          Agenda Ya
          </h1>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 mt-4">¿Por qué a Domicilio?</h3>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Comodidad: Recibe atención médica sin salir de casa.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Personalización: Evaluaciones y tratamientos adaptados a tu entorno específico.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Menor exposición: Reduce el riesgo de contagios al evitar salas de espera.</p>
      <h3 className="text-xl font-semibold mb-2 mt-4">¿Por qué Telemedicina?</h3>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Acceso inmediato: Consulta con un médico experto desde cualquier lugar, sin importar la distancia.</p>
      <p className="mt-[-5vh]"><span className='text-[8vh]'>.</span>Flexibilidad: Horarios de consulta adaptables a tus necesidades.</p>
      <p className="mt-[-5vh] mb-12"><span className='text-[8vh]'>.</span>Seguimiento continuo: Facilita el control y monitoreo de tu salud con mayor frecuencia y comodidad.</p>
    </div>
  </div>
)}


      <div className='mt-24'>
      <h1 className='sm:text-[6vh] text-[4vh] text-[#3F6267]  sm:ml-[-6vh] text-center'>Gracias por confiar en nosotros</h1>
      <div className='flex justify-center mt-24 items-center text-center flex-wrap gap-24 ml-[1vh]'>
      <div className='bg-[#E6E6E6] h-[40vh] w-[50vh] rounded-lg flex flex-col justify-center items-center'>
         <img src={Lucia} className="w-[20vh] mt-[-20vh]" alt="" />
       <h1 className='mt-4'>Lucia</h1>
      <div className='text-center mt-2'>
        <h1>“Por la condición de mi hija con autismo, estoy muy agradecida de la atención, puntualidad y paciencia. Lo recomiendo al 100%”</h1>
         </div>
      </div>

      <div className='bg-[#E6E6E6] h-[40vh] w-[50vh] rounded-lg flex flex-col justify-center items-center'>
          <img src={David} className="w-[20vh] mt-[-15vh]" alt="" />
          <h1 className='mt-4'>David</h1>
      <div className='text-center mt-2'>
        <h1>“Excelentes profesionales. He tomado sesiones con un entrenador personal y ha hecho rutinas adaptadas a mi para hacer en casa. Suelo trabajar mucho y no me da tiempo para ir a gimnasios. Recomendado!!!! 👍🏻”</h1>
         </div>
          </div>

          <div className='bg-[#E6E6E6] h-[40vh] w-[50vh] rounded-lg flex flex-col justify-center items-center'>
          <img src={Jose} className="w-[20vh] mt-[-15vh]" />
          <h1 className='mt-4'>Jose</h1>
      <div className='text-center mt-2'>
        <h1>“Recomiendo Doqia porque además de buen servicio, puedo solicitar medicos para mis padres adultos mayores y guardar su historial medico de forma ordenada. La experiencia del servicio fue muy satisfactoria.”</h1>
         </div>
          </div>
        </div>
      </div>
      
    <div className='bg-[#3F6267] w-[46.5vh] sm:w-[110vh] h-[82vh] mt-24 rounded-xl text-center flex flex-col items-center'>
      <h1 className='text-white text-[6vh] mt-[2vh]' style={{ fontFamily: 'League Spartan, sans-serif' }}>
        Contacta con Nosotros
      </h1>
      <form onSubmit={handleSubmit} className='mt-[5vh] flex-wrap w-full flex flex-col items-center'>
        <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="email" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="tel" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-4' placeholder='Mensaje' value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        <button type="submit" className='bg-[#F3F2F7] w-[20vh] h-[6vh] mt-[2vh] sm:mt-[2vh] text-center text-[#3F6267] rounded-[10vh] ml-[10vh] sm:ml-[5vh]'>
          <h1 className='text-xl'>Enviar</h1>
        </button>
      </form>
      <div className='mt-2'>
        <div className="flex mb-4 sm:w-[80vh] w-[20vh]">
          <input type="checkbox" id="exampleCheckbox1" className='rounded-xl mt-[-3.5vh]' name="exampleCheckbox1" />
          <p className='text-white text-[2vh]'>Acepto recibir información que Doqia considere oportuno enviarme por correo. (Es posible darse de baja en cualquier momento)</p>
        </div>
        <div className="flex mb-4 sm:w-[80vh] w-[20vh]">
          <input type="checkbox" id="exampleCheckbox2" className='rounded-xl mt-[-3.5vh]' name="exampleCheckbox2" />
          <p className='text-white text-[2vh]'>He leído y acepto la información básica sobre protección de datos, así como la política de privacidad y acepto el tratamiento de mis datos para el trámite de la solicitud realizada</p>
        </div>
      </div>
    
   
<img src={ContactarMuneco} className='sm:block hidden xl:mt-[-78vh] 2xl:mt-[-50vh] 2xl:w-[100vh] ml-[200vh]  ' alt="" />
  </div>
</div>  

   
  );
};

export default Home;