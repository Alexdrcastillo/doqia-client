import React, { useState } from 'react';
import './App.css';
import Home from "./components/Home"; 
import { Route, Routes } from 'react-router-dom';
import FormClient from './components/sesion/FormClient';
import FormLogin from './components/sesion/FormLogin';
import FormServiceUser from './components/sesion/FormServiceUser';
import ResultsToSearch from './components/navbar/ResultsToSearch';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/client" element={<FormClient />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register/userServices" element={<FormServiceUser />} />
        <Route path="/results/:address/:occupation" element={<ResultsToSearch />} />
      </Routes>
    </>
  );
}

export default App;
