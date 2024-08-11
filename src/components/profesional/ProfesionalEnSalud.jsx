import React from 'react'
import NavBar from '../navbar/NavBar'
import Laptop from "./imagenes/laptop.png"
import Flechita from "../perfil/images/flechita.png"
import { Link } from 'react-router-dom'

const ProfesionalEnSalud = () => {
  return (
    <div >
      <div className='mt-[40vh]'>
        <NavBar />
      </div>
   <div className='mt-[30vh] ml-12 flex'>
   <Link to={"/"}>
            <img src={Flechita} className='w-[8vh] h-9 mt-2'/>
          </Link>
         <h1 className='mt-2 text-[3.5vh] ml-5'>Trabaja con Doqia</h1>
   </div>
       <Link to="/profesional/registro">
       <button className='ml-[170vh] text-[3vh] text-white bg-[#3F6267] rounded-lg w-[20vh] h-8' >Registrarme</button>
       </Link>

        <h1 className='ml-12  text-[4vh]'>¡Bienvenido/a al futuro de la atención medica!</h1>
        <p className='w-[100vh] ml-12'>Nuestra plataforma es mucho más que una herramienta digital, es una comunidad en línea donde los profesionales de la salud ofrecen sus servicios de manera eficiente y segura, al tiempo que mejoran la vida de sus pacientes.</p>
        <h1 className='ml-12 mt-4 text-[4vh]'>¿Por qué unirse a nuestra red de profesionales?</h1>
        <div className='ml-12'>
        <p className="mt-[-6vh]"><span className='text-[8vh]'>.</span>Acceso a amplia base de pacientes.
        </p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Plan de entrenamiento a medida, adaptado a tus necesidades, objetivos y a tu entorno.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Flexibilidad horaria y comodidad.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Automarización del trabajo administrativo.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Seguridad y confidencialidad.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Crecimiento profesional y aprendizaje continuo.</p>
        </div>
        <h1 className='ml-12 mt-2 text-[4vh]'>¿Cómo funciona?</h1>
        <strong className='text-[2.7vh] m-12 mt-[3vh]'>paso 1: Registro</strong>
        <div className='ml-10 mt-12'>
        <p className="mt-[-13vh]"><span className='text-[8vh]'>.</span>Registrate en el boton de la derecha.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Completa el formulario con tu información personal y profesional.</p>
        <p className="mt-[-8vh]"><span className='text-[8vh]'>.</span>Sube tu Currículum Vitae.</p>
        
        </div>
        
        <strong className='text-[2.7vh] m-12 mt-[1vh]'>paso 2: Verificación de credenciales.</strong>
        <div className='ml-10 mt-12'>
        <p className="mt-[-13vh]"><span className='text-[8vh]'>.</span>Nuestro equipo revisará tus credenciales y verificará tu licencia y certificaciones profesionales.</p>
        <p className="mt-[-8vh] w-[100vh]"><span className='text-[8vh]'>.</span>Una vez tu información este verificada, recibirás una notificación de aceptación para continuar con el proceso de
configuración de tu perfil.
</p>
       </div>
       <strong className='text-[2.7vh] m-12 mt-[3vh]'>paso 3: configuración del perfil.</strong>
        <div className='ml-10 mt-12'>
        <p className="mt-[-13vh] w-[100vh]"><span className='text-[8vh]'>.</span>Completa tu perfil profesional con detalles adicionales, como tu disponibilidad horaria, áreas de especialización,
        disponibilidad, entre otros.</p>
       </div>
       <strong className='text-[2.7vh] m-12 mt-[3vh]'>paso 4: Atiende a tus pacientes</strong>
     
    <div>
  <img src={Laptop} className="ml-[120vh] mt-[-100vh]" alt="Laptop" />
</div>

    </div>
  )
}

export default ProfesionalEnSalud
