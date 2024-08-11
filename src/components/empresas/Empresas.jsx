import React from 'react';
import NavBar from '../navbar/NavBar';
import image from './image.png';
import flechita from "../perfil/images/flechita.png"
import { Link } from 'react-router-dom';

const Empresas = () => {
  return (
    <div>
        <div className='mt-[40vh]'>
      <NavBar  />
        </div>
         <Link to="/">
         <img src={flechita} className='w-[10vh] h-9 mt-[30vh] ml-12' alt="" />
         </Link>
        <div className="flex flex-col items-center justify-center text-center">
  <h1 className="text-[6vh] text-[#3F6267] mb-10">¡Cuidamos de tu equipo para que ellos cuiden de tu empresa!</h1>
  <div className="flex flex-col md:flex-row items-center justify-center">
    <div className="text-center ">
      <h2 className='mb-5 text-[2.5vh]'>¿Sabías que las empresas que invierten en el bienestar de sus colaboradores ven un aumento del 34% en la productividad y una reducción
      del 23% en las bajas laborales?</h2>
      
      
      <p className=' text-[2.4vh] xl:w-[180vh] xl:ml-[20vh]'>En Doqia, entendemos que la salud y bienestar de tus empleados son esenciales para el éxito de tu negocio. Por eso, ofrecemos una amplia gama de servicios médicos diseñados específicamente para empresas, brindando atención integral y personalizada directamente en tu oficina o a través de telemedicina.</p>
      <h3 className='text-[#3F6267] mt-2 ml-[-143vh] text-[4vh]'>Nuestros servicios incluyen:</h3>
      <div className='sm:flex'>
    <img src={image} className="mr-0 md:mr-10 mt-[3vh] ml-6 sm:ml-[8vh] sm:w-[70vh] sm:h-[40vh]" alt="imagen de empresa" />
      <ul className="list-disc pl-5 sm:ml-[-5vh] xl:w-[65vh] ml-3 text-left">
        <li>Fisioterapia: Tratamientos para prevenir y rehabilitar lesiones, mejorando la calidad de vida y productividad de tus empleados.</li>
        <li>Medicina General: Consultas y revisiones médicas para mantener a tu equipo en perfecto estado de salud.</li>
        <li>Vacunación: Campañas de vacunación en el lugar de trabajo para proteger a tus empleados contra enfermedades comunes y estacionales.</li>
        <li>Exámenes de Sangre: Análisis y chequeos periódicos para monitorear la salud y prevenir problemas antes de que surjan.</li>
        <li>Nutricionistas: Asesoría nutricional personalizada para promover hábitos alimenticios saludables y mejorar el bienestar general.</li>
        <li>Entrenadores Físicos: Programas de ejercicio adaptados a las necesidades de tu equipo, ya sea en la oficina o a través de sesiones virtuales.</li>
      </ul>
      </div>
  <h1 className='text-[2.8vh] mb-5 mt-12'>Invierte en la salud de tu equipo y observa cómo se reflejará en la productividad y el ambiente de trabajo. ¡Contáctanos
  hoy y descubre cómo podemos ayudarte a mantener a tu empresa en su mejor forma!</h1>
    </div>
  </div>
</div>
<div className='bg-[#3F6267] w-[46.5vh] xl:w-full h-[82vh] xl:mt-[5vh] rounded-xl text-center flex flex-col items-center'>
    <h1 className='text-white text-[6vh] mt-[2vh]'  style={{ fontFamily: 'League Spartan, sans-serif' }}>Contacta con Nosotros</h1>
    <div className='mt-[5vh] flex-wrap w-full flex flex-col items-center'>
      <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder='Nombre' />
      <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder='Email' />
      <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-6' placeholder="Telefono" />
      <input type="text" className='bg-white rounded-[20vh] w-[30vh] pl-4 text-black mb-4' placeholder='Mensaje' />
    </div>
    <div className=' mt-2'>
      <div className="flex mb-4 sm:w-[80vh] w-[20vh] ">
    <input type="checkbox" id="exampleCheckbox" className='rounded-xl mt-[-3.5vh]' name="exampleCheckbox"></input>
    <p className='text-white text-[2vh]'>Acepto recibir información que Doqia considere oportuno enviarme por correo. (Es posible darse de baja en cualquier momento)</p>
          </div>
          <div className="flex mb-4 sm:w-[80vh] w-[20vh] ">
    <input type="checkbox" id="exampleCheckbox" className='rounded-xl mt-[-3.5vh]' name="exampleCheckbox"></input>
    <p className='text-white text-[2vh]'>He leído y acepto la información básica sobre protección de datos, así como la política de privacidad y acepto el tratamiento de mis datos para el trámite de la solicitud realizada</p>
          </div>
          <div className='bg-[#F3F2F7]  w-[20vh] h-[6vh]  mt-[2vh] sm:mt-[-2vh]  text-center text-[#3F6267] rounded-[10vh] ml-[10vh] sm:ml-[30vh]'>
          <h1 className='text-xl '> 
          Enviar
          </h1>
        </div>
    </div>
   
  </div>  
    </div>
  );
};

export default Empresas;
