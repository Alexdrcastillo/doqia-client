import React, { useState } from 'react';
import NavBar from './navbar/NavBar';
import Raya from "../../images/raya.png";
import Casita from "../../images/casa.png";
import Calendario from "../../images/calendario.png";
import Comodidad from "../../images/comodidad.png";
import Seguridad from "../../images/seguridad.png";
import Calidad from "../../images/calidad.png";
import SeleccionaProfesional from "../../images/selecionaProfesonal.png";
import AgendarClick from "../../images/agendarClick.png";
import Almacena from "../../images/alamaneca.png";
import Deporte2 from "../../images/deporte2.png";
import Nutricion2 from "../../images/nutricion2.png";
import Psicologia2 from "../../images/psicologia2.png";
import Fisioterapia2 from "../../images/fisioterapia2.png";

const Home = () => {
  const [showDeporteInfo, setShowDeporteInfo] = useState(false);
  const [showFisioterapiaInfo, setShowFisioterapiaInfo] = useState(false);
  const [showPsicologiaInfo, setShowPsicologiaInfo] = useState(false);
  const [showNutricionInfo, setNutricionInfo] = useState(false);

  const handleDeporteClick = () => {
    setShowDeporteInfo(true);
  };
  
  const handleShowNutricionClick = () => {
    setNutricionInfo(true);
  };

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
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "500" }} className='w-full'>
        <NavBar />
      </div>

      <div className="text-center text-[#3F6267] mt-[40vh]">
        <h1 className="text-[8vh]">Salud de calidad desde la comodidad de tu hogar</h1>
        <img src={Casita} className="w-[25vh] mt-[-16vh] ml-[170vh]" />
        <img src={Raya} className="w-[30vh] ml-[50vh] mt-[8vh]" />
      </div>

      <div className="flex items-center mt-[-25vh] justify-center h-screen text-[#737373]">
        <div className="mt-[-20.5vh] z-40 bg-[#E8E8E8] h-10 rounded-lg w-[24vh] text-center">
          <p>¿Necesitas agendar?</p>
          <p className="mt-[-4vh] ml-[23vh] w-[20vh]">Cancelar ahora</p>
        </div>
        <div className="text-center z-10 w-[90vh] flex ml-[-24vh] bg-[#E8E8E8] h-[20vh] rounded-lg">
          <div className="flex mt-10 ml-5 bg-white w-[30vh] rounded-lg h-[6vh]">
            <h1 className="mt-1.5 ml-4">Tipo de atencion</h1>
            <select name="atencion" id="" className="rounded-lg"></select>
          </div>
          <div className="flex mt-10 ml-4 bg-white w-[30vh] rounded-lg h-[6vh]">
            <h1 className="mt-1.5 ml-5">Tipo de atencion</h1>
            <select name="atencion" id="" className="rounded-lg"></select>
          </div>
          <div className="flex mt-10 ml-4 bg-[#6D94A3] text-white w-[20vh] rounded-lg h-[6vh]">
            <img src={Calendario} className="w-8 h-8 mt-1 ml-1" alt="" />
            <p className="mt-1.5 ml-2">Reservar</p>
          </div>
        </div>
      </div>

      <div className="mt-[-20vh] text-center">
        <h1 className="text-[#3F6267] text-[6vh]">¿Porque Doqia?</h1>
      </div>

      <div className="flex justify-center items-center text-center gap-52 ml-[-10vh] ">
        <div className='ml-24'>
          <img src={Comodidad} className="mt-24" alt="" />
          <h1 className='text-[4vh] ml-[-7vh] text-[#3F6267]'>Comodidad</h1>
          <p className='text-[#545454] ml-[-4vh] w-[35vh]'>Sin filas de espera, rápido y en la comodidad de tu hogar.</p>
        </div>
        <div>
          <img src={Seguridad} className="mt-24 ml-6" alt="" />
          <h1 className='text-[4vh] ml-[-7vh] text-[#3F6267]'>Seguridad</h1>
          <p className='text-[#545454] ml-[-4vh] w-[35vh]'>Sin filas de espera, rápido y en la comodidad de tu hogar.</p>
        </div>
        <div>
          <img src={Calidad} className="mt-24 ml-6" alt="" />
          <h1 className='text-[4vh] ml-[-7vh] text-[#3F6267]'>Calidad</h1>
          <p className='text-[#545454] ml-[-4vh] w-[35vh]'>Sin filas de espera, rápido y en la comodidad de tu hogar.</p>
        </div>
      </div>

      <div className='mt-32 ml-16'>
        <h1 className='text-[6vh] text-[#3F6267] ml-[-6vh] text-center'>¿Cómo funciona?</h1>
        <div className='flex justify-center mt-18 items-center text-center gap-32 ml-[-10vh]'>
          <div>
            <img src={SeleccionaProfesional} className='ml-16 w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] text-[4vh] w-[45vh]'>Encuentra al profesional que necesitas</h1>
            <p className='text-[#545454] ml-[2vh] mt-4 w-[40vh]'>Encuentra fisioterapeutas, psicólogos, nutricionistas y más!.</p>
          </div>
          <div>
            <img src={AgendarClick} className='ml-16 w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] text-[4vh] w-[45vh]'>Agenda con 1 click</h1>
            <p className='text-[#545454] ml-[2vh] mt-4 w-[40vh]'>Solicita al profesional que necesites en 1 solo clic.</p>
          </div>
          <div className='mt-10'>
            <img src={Almacena} className='ml-16 w-[24vh]' alt="" />
            <h1 className='text-[#3F6267] text-[4vh] w-[45vh] '>Almacena y comparte tus informes médicos</h1>
            <p className='text-[#545454] ml-[2vh] mt-4 w-[40vh]'>Almacena tus informes médicos y compártelos con el profesional que desees para una atención personalizada a tus necesidades.</p>
          </div>
        </div>
      </div>

      <div className='mt-24'>
        <h1 className='text-[6vh] text-[#3F6267] ml-[-6vh] text-center'>Nuestros Servicios ¡Haz Clic y Conoce Más!</h1>
        <div className='flex justify-center mt-24 items-center text-center gap-32 ml-[1vh]'>
          <img src={Deporte2} alt="" onClick={handleDeporteClick} />
          <img src={Nutricion2} alt="" onClick={handleShowNutricionClick}/>
          <img src={Psicologia2} alt="" onClick={handlePsicologiaClick} />
          <img src={Fisioterapia2} alt="" onClick={handleFisioterapiaClick}/>
        </div>
      </div>

      {showDeporteInfo && (
        <div style={{ position: "fixed", zIndex: "1000" }} className="fixed  top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] h-[95vh] max-w-4xl relative">
            <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
            <h1 className="text-3xl text-center font-bold mb-4 text-[#3F6267]">Deporte</h1>
            <p className="mb-4">Nuestros entrenadores expertos están disponibles para sesiones a domicilio y a través de videollamada, brindándote la comodidad y flexibilidad que necesitas para mantenerte saludable y en forma.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión de Entrenamiento a domicilio </h3>
           <div className='mt-[1vh]'>
            <h3 className="text-xl font-semibold mb-2">¿Que incluye?</h3>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada de tu condición física y objetivos.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Plan de entrenamiento a medida, adaptado a tus necesidades, objetivos y a tu entorno.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Consejos prácticos para optimizar tu rutina de ejercicios y mantenerte motivado.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Acompañamiento y corrección de posturas y ejercicios.</p>
            <h3 className="text-md font-semibold mb-2">Las sesiones pueden ser llevadas a cabo en el domicilio, videollamada o al aire libre (parque o explanada).</h3>
          <div className='bg-[#F3F2F7] w-[20vh] h-[6vh] mt-[5vh] text-center text-[#3F6267] rounded-[10vh] ml-[28vh]'>
            <h1 className='text-xl mt-[5vh]'> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>
      )}
      
        

      
       

        {showFisioterapiaInfo && ( <div style={{ position: "fixed", zIndex: "1000" }} className="fixed  top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] h-[95vh] max-w-4xl relative">
            <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
            <h1 className="text-3xl text-center font-bold mb-4 text-[#3F6267]">Fisioterapia</h1>
            <p className="mb-4">Nuestros fisioterapeutas expertos están disponibles para sesiones a domicilio, brindándote la comodidad y flexibilidad que necesitas para tu rehabilitación y cuidado físico.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#3F6267]">Sesión nutricional a Domicilio   </h3>
           <div className='mt-[1vh]'>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Evaluación personalizada de tu condición física </p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>necesidades terapéuticas en la comodidad de tu hogar.Sesión de fisioterapia según necesidades</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Tercera edad y personas postradas: mejorar movilidad, reducir dolor crónico y aumentar la calidad de vida. Ejercicios específicos para mejorar fuerza, equilibrio y coordinación..</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Rehabilitación de lesiones: Técnicas manuales y ejercicios terapéuticos para aliviar dolor y mejorar flexibilidad</p>

          <div className='bg-[#F3F2F7] w-[20vh] h-[6vh] mt-[5vh] text-center text-[#3F6267] rounded-[10vh] ml-[28vh]'>
            <h1 className='text-xl mt-[5vh]'> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>)}

        {showPsicologiaInfo && ( <div style={{ position: "fixed", zIndex: "1000" }} className="fixed  top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] h-[95vh] max-w-4xl relative">
            <button onClick={handleCloseClick} className="absolute top-2 right-2 text-xl">&times;</button>
            <h1 className="text-3xl text-center font-bold mb-4 text-[#655F7D]">Psicologia</h1>
            <p className="mb-4">Nuestros psicólogos expertos están aquí para apoyarte, ya sea en la comodidad de tu hogar o a través de telemedicina. Entendemos lo importante que es tu bienestar emocional, por eso te ofrecemos la comodidad y flexibilidad que necesitas para recibir el cuidado que mereces.</p>
            <h3 className="text-xl font-semibold mb-2 text-[#655F7D]  ">Sesiónes a Domicilio (individual o grupal) y Telemedicina </h3>
           <div className='mt-[1vh]'>
    
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia individual: Sesiones personalizadas para abordar problemas específicos como ansiedad, depresión, estrés, etc.</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia de pareja: Mejora de la comunicación y resolución de conflictos</p>
            <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Terapia familiar: Intervenciones para mejorar las dinámicas familiares y resolver conflictos. Apoyo para familias que enfrentan problemas como divorcio, enfermedad, o pérdida.</p>
       
          <div className='bg-[#F3F2F7] w-[20vh] h-[6vh] mt-[6vh] text-center text-[#655F7D] rounded-[10vh] ml-[28vh]'>
            <h1 className='text-xl mt-[5vh]'> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>)}
        {showNutricionInfo && ( <div style={{ position: "fixed", zIndex: "1000" }} className="fixed  top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex justify-center items-center border-[#3F6267]">
          <div className="bg-white p-8 rounded-lg w-[90vh] h-[95vh] max-w-4xl relative">
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
          <div className='bg-[#F3F2F7] w-[20vh] h-[6vh] mt-[5vh] text-center text-[#516454] rounded-[10vh] ml-[28vh]'>
            <h1 className='text-xl mt-[5vh]'> 
            Agenda Ya
            </h1>
          </div>
           </div>
        

      
          </div>
        </div>)}

    </div>
  );
};

export default Home;