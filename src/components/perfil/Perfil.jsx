import React from 'react'
import NavBar from '../navbar/NavBar'
import Flechita from "./images/flechita.png"
import FichaMedica from "./images/fichaMedica.png"
import MisDocumentos from "./images/misDocumentos.png"
import HistorialDeReservas from "./images/historialDeReservas.png"
import Familiares from "./images/familiares.png"
import Guardados from "./images/guardados.png"
import MisDirecciones from "./images/misDirecciones.png"
import Pagos from "./images/pagos.png"
import Ayuda from "./images/ayuda.png"
import CambiarProfesional from "./images/cambiarProfesional.png"
import { Link } from 'react-router-dom'

const Perfil = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
   
  return (
    <div>
        <div className='mt-[40vh]'>
        <NavBar />
        </div>

        <div className='mt-[27vh] ml-12'>
          <div  className='flex gap-12'>
            <Link to={"/"}>
            <img src={Flechita} className='w-[8vh] h-9 mt-2'/>
            </Link>
            <h1 className='text-[#3F6267] text-[5vh]'>Hola!, {user.username}</h1>
          </div>
          <div>
          <h1 className='text-[#8792A0] text-[4vh] mt-6'>Perfil</h1>
          <img src={FichaMedica} />
          <div className='flex justify-center mt-[-44vh] w-[60vh] ml-[50vh] items-center text-center flex-wrap gap-4  '>
            <img src={MisDocumentos} />
            <img src={HistorialDeReservas} />
            <img src={Familiares} />
            <img src={Guardados} />
          </div>
          <div className='ml-[120vh] mt-[-50vh]'>
            <h1 className='text-[#8792A0]  text-[4vh]'>Ajustes de cuenta</h1>
            <img src={MisDirecciones} className="mt-6" alt="" />
            <img src={Pagos} className="mt-2" alt="" />
            <img src={Ayuda} className="mt-2" alt="" />
            <img src={CambiarProfesional} className="mt-2" alt="" />
          </div>

          </div>
        </div>
    </div>
  )
}

export default Perfil
