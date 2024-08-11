import React, { useState } from 'react';
import './App.css';
import Home from "./components/Home"; 
import { Route, Routes } from 'react-router-dom';
import FormClient from './components/sesion/FormClient';
import FormLogin from './components/sesion/FormLogin';
import FormServiceUser from './components/sesion/FormServiceUser';
import Perfil from './components/perfil/Perfil';
import Servicios from "./components/servicios/Servicios"
import ServicioSeleccionado from './components/servicios/ServicioSeleccionado';
import ProfesionalEnSalud from './components/profesional/ProfesionalEnSalud';
import ProfesionalRegistro from './components/profesional/ProfesionalRegistro';
import PerfilProfesional from './components/perfil/PerfilProfesional';
import  Dashboard  from './components/dashboard/Dasboard';
import Empresas from './components/empresas/Empresas';
function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/:address/:servicio" element={<Servicios /> } />
        <Route path="/servicio/:serviceId" element={<ServicioSeleccionado /> } />
        <Route path="/profesional" element={<ProfesionalEnSalud /> } />
        <Route path="/profesional/registro" element={<ProfesionalRegistro /> } />
        <Route path="/perfil/profesional/:id" element={<PerfilProfesional /> } />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/empresas" element={<Empresas /> } />

      </Routes>
    </>
  );
}

export default App;
