import React, { useEffect, useState,useRef } from 'react';
import Logo from "../../../images/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicinaGeneral from "../../../images/medicoGeneralImage.png";
import Fisioterapia from "../../../images/fisioterapiaImage.png";
import Nutricion from "../../../images/NutricionImage.png";
import Psicologia from "../../../images/psicologiaImage.png";
import Deporte from "../../../images/deporteImage.png";
import ContinuarConFaceBoton from "../../../images/continuarConFaceBoton.png";
import ContinuarConGoogleBoton from "../../../images/continuarConGoogleBoton.png";
import ContinuarConCorreo from "../../../images/iniciarSesionConCorreo.png";
import O from "../../../images/o.png";
import RegistrarseConCorreo from "../../../images/registrarseConCorreo.png";
import axios from 'axios';
import OptionMedicinaGeneral from "./images/optionMedicinaGeneral.png"
import OptionsFisioterapia from "./images/optionsFisioterapia.png"
import OptionNutricion from "./images/optionNutricion.png"
import OptionsPsicologia from "./images/optionsPsicologia.png"
import OptionDeporte from "./images/optionDeporte.png"
import { useNavigate } from 'react-router-dom';
import DomicilioOTelemedicinaImage from "./images/domicilioOTelemedicinaImage.png"
import Domicilio from "./images/domicilio.png"

import { Link } from 'react-router-dom';

function NavBar({ agendaOption }) {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showOptionsMedicinaGeneral, setShowOptionesMedicinaGeneral] = useState(false)
  const [showOptionMedicinaGeneral2, setShowOptionMedicinaGeneral2] = useState(false)
  const [showOptionsFisioterapia, setShowOptionsFisioterapia] = useState(false)
  const [showOptionsFisioterapia2, setShowOptionsFisioterapia2] = useState(false)
  const [showOptionNutricion, setShowOptionNutricion] = useState(false)
  const [showOptionNutricion2, setShowOptionNutricion2] = useState(false)
  const [showOptionsPsicologia, setShowOptionsPsicologia] = useState(false)
  const [showOptionsPsicologia1, setShowOptionsPsicologia1] = useState(false) 
  const [ShowTelemedicinaOption, setShowTelemedicinaOption] = useState(false)
  const [showOptionDeporte, setShowOptionDeporte] = useState(false)
  const [showOptionDeporte1, setShowOptionDeporte1] = useState(false)
  const [showModalOptions, setShowModalOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [serviceType, setServiceType] = useState('');
 const  [ciudad, setCiudad] = useState(""); 
 const [filterOption, setFilterOption] = useState(''); // new state for filter option
 const [selectedFisioterapiaOption, setSelectedFisioterapiaOption] = useState(null);
 const [selectedPsicologiaOption, setSelectedPsicologiaOption] = useState(null);

  const medicinaGeneralRef = useRef(null);
  const fisioterapiaGeneralRef = useRef(null);
  const nutricionGeneralRef = useRef(null);
  const psicologiaGeneralRef = useRef(null);
  const DeporteGeneralRef = useRef(null);
  const showModalGeneralRef = useRef(null);
  const navigate = useNavigate();

console.log(agendaOption)

const ciudadesDeEspaña = ['Barcelona' ];

  useEffect(() => {
     if (agendaOption == "deporte") {
      setShowOptionDeporte(true)
      setShowModalOptions(true)
      setSelectedOption('Entrenador personal');
     } else if (agendaOption == "nutricionista") {
      setSelectedOption('Nutricionista');
      setShowModalOptions(true)
     } else if (agendaOption == "psicologia") {
      setShowOptionsPsicologia(true);
      setShowOptionDeporte(false);
      setSelectedOption('Terapia familiar psicologia');
      setShowModalOptions(true)
     } else if (agendaOption == "fisioterapia") {
      setShowOptionsFisioterapia(true)
      setShowModalOptions(true)
      setSelectedOption('Tercera edad');
     } else if (agendaOption == "Medicina General") {
      setSelectedOption('Sesion Medicina General');
      setShowModalOptions(true)

     }
  }, [agendaOption])

  useEffect(() => {
    function handleClickOutside(event) {
      if (showModalGeneralRef.current && !showModalGeneralRef.current.contains(event.target)) {
        setShowModalOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModalGeneralRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (fisioterapiaGeneralRef.current && !fisioterapiaGeneralRef.current.contains(event.target)) {
        setShowOptionsFisioterapia(false);
        setShowOptionsFisioterapia2(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fisioterapiaGeneralRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (medicinaGeneralRef.current && !medicinaGeneralRef.current.contains(event.target)) {
        setShowOptionesMedicinaGeneral(false);
        setShowOptionMedicinaGeneral2(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [medicinaGeneralRef]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (DeporteGeneralRef.current && !DeporteGeneralRef.current.contains(event.target)) {
        setShowOptionDeporte1(false);
        setShowOptionDeporte(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [DeporteGeneralRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (fisioterapiaGeneralRef.current && !fisioterapiaGeneralRef.current.contains(event.target)) {
        setShowOptionsFisioterapia(false);
        setShowOptionsFisioterapia2(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fisioterapiaGeneralRef]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (nutricionGeneralRef.current && !nutricionGeneralRef.current.contains(event.target)) {
        setShowOptionNutricion2(false)
        setShowOptionDeporte(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [nutricionGeneralRef]);

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (DeporteGeneralRef.current && !DeporteGeneralRef.current.contains(event.target)) {
       setShowOptionDeporte1(false)
       setShowModalOptions(false);

      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [DeporteGeneralRef]);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (psicologiaGeneralRef.current && !psicologiaGeneralRef.current.contains(event.target)) {
        setShowOptionsPsicologia(false);
        setShowOptionsPsicologia1(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fisioterapiaGeneralRef]);
 
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('http://backend.doqia.es/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowUserOptions(false);
    window.location.reload(); // Recargar la página
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUserClick = () => {
    setShowUserOptions(!showUserOptions);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogin = () => {
    setIsLogin(true);
    setShowForm(false);
    toggleModal();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRegister = () => {
    setIsLogin(false);
    setShowForm(false);
    toggleModal();
  };

  const handleContinueWithEmail = () => {
    setShowForm(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setShowModal(false);
      window.location.reload(); // Recargar la página
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  console.log(users)

  const handleChangeCiudad = (e) => {
    const value = e.target.value;
    setCiudad(value); // Actualiza el estado con el nuevo valor del input
    
    // Verifica si la ciudad ingresada es Barcelona
    if (value.toLowerCase() === 'barcelona') {
      setFilterOption('domicilio'); // Restringe a 'domicilio' en Barcelona
    } else {
      setFilterOption(''); // Elimina la restricción en otras ciudades
    }
    
    console.log(value);
  };
  

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = {
            username: username,
            email: email,
            password: password,
            is_client: true,
            ciudad: null,
            numero_salud: null
        };


        console.log(formData)
        const res = await axios.post('http://backend.doqia.es/users', formData);

        localStorage.setItem('user', JSON.stringify(res.data.user));
        setShowModal(false);
        window.location.reload();
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Error al crear usuario');
    }
};

  
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleShowOptionMedicinaGeneral = () => {
    setSelectedOption('Médico');
    setShowOptionMedicinaGeneral2(true)
    }

  
  

  const handleShowOptionsPsicologia = () => {
    setShowOptionsPsicologia(true);
    setShowOptionDeporte(false);
    setSelectedOption('Psicologo');

    
  };

  const handleShowOptionDeporte = () => {
    setShowOptionDeporte1(true)
    setShowOptionsPsicologia(false);
    setSelectedOption('Entrenador');
    
  };

  const handleShowOptionNutricion = () => {
  
    setSelectedOption('Nutricionista');
    setShowOptionNutricion2(true)
  };
  
  
  const handleShowModalOptions = () => {
    setShowModalOptions(true)
  }

  const handleShowOptionsFisioterapia = () => {
    setShowOptionsFisioterapia(!showOptionsFisioterapia);

  };

  const handleSelectFisioterapiaOption = (option) => {
    setSelectedFisioterapiaOption(option);
    setShowOptionsFisioterapia2(true);
  };

  const handleSelectPsicologiaOption = (option) => {
      setSelectedPsicologiaOption(option);
      setShowOptionsPsicologia1(true)
  }

  const handleServiceType = (type) => {
    setServiceType(type);
    setShowModalOptions(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowModalOptions(true);
  };
  
  
  const handleBuscarServicio = () => {
    const address = ciudad;
    const servicio = selectedOption;
    navigate(`/${address}/${servicio}`);

  }

  const handleShowFisioterapia2 = () => {
    setShowOptionsFisioterapia2(true)

    }

  const handleShowMedicinaGeneral2 = () => {
    setShowOptionMedicinaGeneral2(true)
  }

  const handleShowNutricion1 = () => {
    setShowOptionNutricion2(true)
  }


  const handleShowPsicologia = () => {
    setShowOptionsPsicologia1(true)
  }
  const handleShowDeporte1 = () => {
    setShowOptionDeporte1(true)
  }

  const handleShowTelemedicinaOption = () => {
    setShowTelemedicinaOption(true)
  }

  const getMarginTop = () => {
    switch (selectedFisioterapiaOption) {
      case 'Infantil':
        return 'mt-[22vh]';
      case 'Deportistas':
        return 'mt-[13vh]';
      case 'Tercera edad':
        return 'mt-[2vh]';
      case 'Rehabilitacion de lesiones':
        return 'mt-[6vh]';
      case 'Masoterapia':
        return 'mt-[17vh]';
      default:
        return 'mt-[20vh]';
    }
  };

  const getMarginTop2 = () => {
    switch (selectedPsicologiaOption) {
      case 'Terapia Individual':
        return 'mt-[1vh]';
      case 'Terapia de Pareja':
        return 'mt-[24vh]';
      case 'Terapia Familiar':
        return 'mt-[30vh]';
      case 'Rehabilitacion de lesiones':
        return 'mt-[6vh]';
      case 'Terapia Niños y Adolescentes':
        return 'mt-[15vh]';
      default:
        return 'mt-[37vh]';
    }
  };

  const handleBuscarServicioTelemedicina = (address) => {
    const servicio = selectedOption;
    navigate(`/${address}/${servicio}`);

    console.log(servicio)
    console.log(address)
  }
  return (
    <div className="relative">
      <div className={`bg-[#A7D2E2] mt-[-40vh] h-10 ${showModal ? 'blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex sm:ml-0 xl:ml-[5vh]">
          <Link to="/">
            <div className="text-white text-[2.7vh] font-bold mt-2">
              Paciente
            </div>
            </Link>
            <Link to="/profesional">
            <div className="text-white text-[2.7vh] font-bold mt-2 ml-4">
              Profesional de salud
            </div>
            </Link>
          </div>
        </div>
        <div className="bg-[#FAFAFA] sm:mt-1 h-32 w-full flex items-center justify-between">
          <img src={Logo} className=" w-[30vh] sm:w-[60vh] xl:ml-[2vh] mt-[-8.5vh]" alt="Logo" />
          <Link to="/empresas" style={{zIndex: 10000}}>
          <h1 className="text-[#82BFD6] sm:mt-[1vh] xl:mt-[-6vh]  text-lg items-center ml-[-19vh] sm:ml-[113vh] mr-4">Empresas</h1>
          </Link>
          <div>
  {!user ? (
    <div style={{zIndex: 10}} className="sm:w-[15vh] w-[13.5vh] mt-[12vh]  sm:mt-[0.5vh] border border-black rounded-lg px-1 py-1 border-[#545454] text-[#545454] ml-[-14vh] sm:ml-auto mr-4 cursor-pointer" onClick={toggleDropdown} style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      <AccountCircleIcon />
      Acceder
    </div>
  ) : (
    <div  style={{zIndex: 10}}>
      
      <div className="sm:w-[17vh] w-[13.5vh] mt-[15vh] sm:mt-[9vh] border border-black rounded-lg px-1 py-1 border-[#545454] text-[#545454] flex items-center ml-[-15vh] sm:ml-auto mr-4 cursor-pointer" onClick={handleUserClick} style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <AccountCircleIcon />
        {user.username}
      </div>
      {showUserOptions && (
        <div className="absolute sm:ml-[0vh] mt-24 ml-[-20vh] sm:right-0 top-full bg-white border border-gray-300 rounded-lg shadow-lg w-[20vh]">
          <Link to={"/perfil"} className="py-6 px-4 cursor-pointer">
            Perfil
          </Link>
          <div className="py-2 px-4 cursor-pointer" onClick={handleLogout}>Cerrar sesión</div>
        </div>
      )}
    </div>
  )}

 
            <div className="flex ml-[-42vh] sm:ml-[-170.5vh] gap-4 mt-[-11vh] sm:mt-[-10vh]">
              <div onClick={handleShowOptionMedicinaGeneral} className="border text-center h-12 sm:h-8 mt-[12vh] bg-[#F2F2F2] flex w-[13vh] sm:w-[30vh] rounded-xl">
                <p className="mt-1 ml-8 sm:text-sm text-[1.4vh] "> Medicina General</p>
              </div>
               {showOptionsMedicinaGeneral && (
        <div ref={medicinaGeneralRef} className='fixed border flex rounded-[20vh] bg-[#F2F2F2] xl:mt-[21vh] mt-[19vh] bg-white w-[22vh] sm:w-[33vh] h-[6vh]'>
          <p className='mt-1   ml-4 text-center' onClick={handleShowMedicinaGeneral2}>Sesion Medicina General</p>
        </div>
      )}
      {
        showOptionMedicinaGeneral2 && (
          <div ref={medicinaGeneralRef} className='fixed border flex rounded-[2vh] bg-white xl:mt-[20vh] mt-[27vh] bg-white w-[22vh] sm:w-[45vh] h-[12vh]'>
          <img src={DomicilioOTelemedicinaImage} className='w-8 ml-[0.4] h-[11vh] mt-3 sm:mt-1' alt="" />
          <p className='mt-1 w-[40vh]' onClick={handleShowModalOptions}>Médico a Domicilio</p>
          <p className='mt-1 w-[50vh] xl:mt-[7vh] xl:ml-[-32vh]' onClick={() => handleBuscarServicioTelemedicina("barcelona")}>Médico por Telemedicina</p>
        </div>
        )
      }
              <div>
      <div onClick={handleShowOptionsFisioterapia} className="border mt-[12vh] bg-[#F2F2F2] sm:ml-[0vh] ml-[1vh] sm:h-[5vh] h-[6vh] flex sm:w-[30vh] rounded-xl">
        <p className="sm:mt-[0.6vh] mt-3 sm:ml-3 xl:ml-[9vh] sm:text-sm text-[1.4vh]">Fisioterapia</p>
      </div>

      {showOptionsFisioterapia && (
        <div ref={fisioterapiaGeneralRef} className="fixed ml-[10vh] sm:ml-[0vh] border flex rounded-[5vh] bg-[#F2F2F2] xl:mt-[1vh] mt-[19vh] bg-white w-[30vh] sm:w-[33vh] h-[25vh] sm:h-[29vh]">
          <div className="wrap">
            <p className="mt-2 text-center" onClick={(e) => { e.stopPropagation(); handleSelectFisioterapiaOption('Tercera edad'); }}>Tercera edad</p>
            <p className="sm:mt-2 mt-[3vh] ml-2 text-center" onClick={(e) => { e.stopPropagation(); handleSelectFisioterapiaOption('Rehabilitacion de lesiones'); }}>Rehabilitacion de lesiones</p>
            <p className="sm:mt-2 mt-[2vh] text-center" onClick={(e) => { e.stopPropagation(); handleSelectFisioterapiaOption('Deportistas'); }}>Deportistas</p>
            <p className="sm:mt-2 mt-[1vh] text-center" onClick={(e) => { e.stopPropagation(); handleSelectFisioterapiaOption('Masoterapia'); }}>Masoterapia</p>
            <p className="mt-2 text-center" onClick={(e) => { e.stopPropagation(); handleSelectFisioterapiaOption('Infantil'); }}>Infantil</p>
          </div>
        </div>
      )}

      {showOptionsFisioterapia2 && (
        <div ref={fisioterapiaGeneralRef} onClick={() => setSelectedOption("Fisioterapeuta")} className={`fixed border flex rounded-[2vh] xl:ml-[36vh] bg-white ${getMarginTop()} bg-white w-[22vh]  sm:w-[45vh] h-[12vh] xl:h-[7vh]`}>
          <img src={Domicilio} className="w-8 ml-[0.4] h-[5vh] mt-2 sm:mt-2" alt="" />
          <p className="mt-1 xl:mt-2 w-[40vh]" onClick={handleShowModalOptions}>Fisioterapeuta a Domicilio</p>
        </div>
      )}
    </div>
                <div onClick={handleShowOptionNutricion} className="border sm:h-8 h-12 sm:ml-[0] ml-[vh] mt-[12vh] bg-[#F2F2F2] flex sm:w-[30vh] rounded-xl">
                <p className="sm:mt-1 mt-3 xl:ml-[10vh] sm:ml-3 ml-1 sm:text-sm text-[1.4vh]">Nutrición</p>
              </div>
              { // setShowModalOptions(true)
              showOptionNutricion && (
        <div ref={nutricionGeneralRef} onClick={handleShowNutricion1} className='fixed border flex rounded-[20vh] ml-[16vh] sm:ml-[64vh] bg-[#F2F2F2] mt-[19vh] bg-white w-[23vh] sm:w-[33vh] h-[4.5vh] sm:h-[6vh]'>
          <p className='mt-1 ml-9  text-center'>Sesion Nutricional</p>
        </div>
      )}
      {
        showOptionNutricion2&& (
          <div ref={nutricionGeneralRef} className='fixed border flex rounded-[2vh] xl:ml-[65vh] bg-white xl:mt-[20vh] mt-[26vh] bg-white w-[22vh] sm:w-[45vh] h-[12vh]'>
          <img src={DomicilioOTelemedicinaImage} className='w-8 ml-[0.4] h-[11vh] mt-3 sm:mt-1' alt="" />
        
          <p className='mt-1 w-[40vh]' onClick={handleShowModalOptions}>Nutricionista a Domicilio</p>
          <p className='mt-1 w-[50vh] xl:mt-[7vh] xl:ml-[-32vh]' onClick={() => handleBuscarServicioTelemedicina("barcelona")}>Nutricionista por Telemedicina</p>
        </div>
        )
      }
              <div onClick={handleShowOptionsPsicologia} className={`border sm:h-8 h-12 mt-[19vh] sm:mt-[12vh] ml-[-35vh] sm:ml-0 bg-[#F2F2F2] flex sm:w-[30vh] w-[13vh] rounded-xl`}>
                <p className="sm:mt-1 mt-3 xl:ml-[9vh]  sm:ml-3 ml-0 sm:text-sm text-[1.4vh]">Psicología</p>
              </div>
              {showOptionsPsicologia && (
        <div ref={psicologiaGeneralRef} onClick={handleShowPsicologia}  className ={`fixed  ${getMarginTop2()}  ml-[1vh] sm:ml-[96vh] border flex rounded-[5vh] bg-[#F2F2F2] mt-[25vh] sm:mt-[19vh] bg-white w-[33vh] h-[25vh] sm:h-[28vh]`}>
          <div className={`wrap `}>
          <p className='mt-2 text-center' onClick={(e) => { e.stopPropagation(); handleSelectPsicologiaOption('Terapia Individual'); }}>Terapia Individual</p>
<p className='mt-1 text-center' onClick={(e) => { e.stopPropagation(); handleSelectPsicologiaOption('Terapia de Pareja'); }}>Terapia de Pareja</p>
<p className='sm:mt-2 mt-4 text-center' onClick={(e) => { e.stopPropagation(); handleSelectPsicologiaOption('Terapia Familiar'); }}>Terapia Familiar</p>
<p className='SM:mt-2 mt-4 text-center ' onClick={(e) => { e.stopPropagation(); handleSelectPsicologiaOption('Terapia Niños y Adolescenter'); }}>Terapia Niños y Adolescentes</p>
          </div>
        </div>
      )}
      {
        showOptionsPsicologia1 && (
          <div ref={psicologiaGeneralRef} className={`fixed border ${getMarginTop2()}  flex rounded-[2vh] xl:ml-[130vh] bg-white mt-[20vh] bg-white w-[22vh] sm:w-[45vh] h-[12vh]`}>
          <img src={DomicilioOTelemedicinaImage} className='w-8 ml-[0.4] h-[11vh] mt-3 sm:mt-1' alt="" />
          <p className='mt-1 w-[40vh]' onClick={handleShowModalOptions}>Psicologo a Domicilio</p>
          <p className='mt-1 w-[50vh] xl:mt-[7vh] xl:ml-[-32vh]' onClick={() => handleBuscarServicioTelemedicina("barcelona")}>Psicologo por Telemedicina</p>
        </div>
        )
      }
              <div onClick={handleShowOptionDeporte} className="border sm:h-8 h-12 mt-[19vh] sm:mt-[12vh] bg-[#F2F2F2] flex sm:w-[30vh] w-[15vh] rounded-xl">
                <p className="sm:mt-1 mt-3 ml-3 xl:ml-[5vh] text-[1.4vh] sm:text-sm">Entrenador Personal</p>
              </div>
              {showOptionDeporte && (
        <div ref={DeporteGeneralRef} onClick={handleShowDeporte1}  className='fixed border flex rounded-[20vh] ml-[10vh] sm:ml-[129vh] bg-[#F2F2F2] mt-[26vh] sm:mt-[19vh] bg-white w-[26vh] sm:w-[33vh] h-[5vh] sm:h-[6vh]'>
          <p className='mt-1 ml-8 text-center'>Entrenador Personal</p>
        </div>
      )}

{
        showOptionDeporte1 && (
          <div ref={DeporteGeneralRef} className='fixed border flex rounded-[2vh] xl:ml-[130vh] bg-white xl:mt-[20vh] mt-[26vh] bg-white w-[22vh] sm:w-[45vh] h-[12vh]'>
          <img src={DomicilioOTelemedicinaImage} className='w-8 ml-[0.4] h-[11vh] mt-3 sm:mt-1' alt="" />
          <p className='mt-1 w-[40vh]' onClick={handleShowModalOptions}>Entrenador a Domicilio</p>
          <p className='mt-1 w-[50vh] xl:mt-[7vh] xl:ml-[-32vh]' onClick={() => handleBuscarServicioTelemedicina("barcelona")}>Entrenador por Telemedicina</p>
        </div>
        )
      }
            </div>
          </div>
     
        </div>
      </div>

      {showModalOptions && (
  <div className="fixed inset-0 flex sm:mt-0 mt-[-30vh] items-center justify-center z-50" onClick={() => setShowModalOptions(false)}>
    <div className="absolute inset-0 bg-black bg-opacity-50 blur-lg"></div>
    <div className="relative bg-white h-[40vh] p-10 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
      <div onClick={() => setShowModalOptions(false)} className="w-[4vh] ml-[33vh] h-[4vh] rounded-[100vh]">
        <p className="ml-2 mt-[-1.5vh]">X</p>
      </div>
      <h1 className="text-xl text-center font-bold text-[#3F6267] xl:mt-[-3.5vh]">{selectedOption}</h1>
      <select
        value={ciudad}
        onChange={handleChangeCiudad}
        className="border w-[35vh] xl:mt-4 p-1 border-black sm:ml-[1vh] ml-[1vh] rounded-lg"
      >
        <option value="" disabled>Seleccione una ciudad</option>
        {ciudadesDeEspaña.map((ciudad, index) => (
          <option key={index} value={ciudad}>{ciudad}</option>
        ))}
      </select>
      <div className="wrap ml-[10vh] w-[20vh]">
        <button className="mt-4 px-4 sm:ml-3 ml-[4vh] py-2 bg-[#A7D2E2] text-white rounded" onClick={handleBuscarServicio}>Buscar</button>
        <h1 className="text-[#9f9f9f] text-[2.3vh] xl:mt-3 xl:ml-[-6vh] xl:w-[30vh]">Por ahora sólo disponible en Barcelona</h1>
      </div>
      {ciudad.toLowerCase() === 'barcelona' && filterOption !== 'domicilio' && (
        <p className="text-red-500 mt-2">En Barcelona solo se permite el tipo de servicio "Domicilio".</p>
      )}
    </div>
  </div>
)}




     


      {!localStorage.getItem('user') && showDropdown && (
        <div className="absolute  ml-[25vh] sm:right-4 top-20 mt-[5vh] sm:mt-[10vh] bg-white border border-gray-300 rounded-lg shadow-lg w-[20vh]">
          <div className="py-2 px-4 cursor-pointer" onClick={handleLogin}>Iniciar sesión</div>
          <div className="py-2 px-4 cursor-pointer" onClick={handleRegister}>Crear cuenta</div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg mt-[-20vh] sm:mt-[0vh] sm:mt-[-320vh] sm:ml-[0vh] ml-[-1vh] w-[50vh] sm:w-[85vh] text-center h-[80vh] relative">
            <h2 className="text-[4vh] font-bold mb-4">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
            <button
              className="h-[5vh] w-[5vh] bg-[#EBEBEC] text-black flex items-center justify-center rounded-full absolute top-4 right-4"
              onClick={toggleModal}
            >
              X
            </button>
            <div className='flex items-center text-center justify-center flex-wrap gap-5 mt-10'>
              {isLogin ? (
                !showForm ? (
                  <>
                    
                    <img src={O} alt="O" />
                    <img
                      src={ContinuarConCorreo}
                      alt="Continuar con Correo"
                      className="cursor-pointer"
                      onClick={handleContinueWithEmail}
                    />
                  </>
                ) : (
                  <form className="w-full mt-10" onSubmit={handleLoginFormSubmit}>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-[#05BEB4] rounded-md p-2 mb-4 w-full"
                      onChange={handleEmailChange}
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border border-[#05BEB4] rounded-md p-2 mb-4 w-full"
                      onChange={handlePasswordChange}
                    />
                    <h1 className='text-[#05BEB4] ml-[30vh] sm:ml-[40vh]'>¿Has olvidado tu contraseña?</h1>
                    <button className="bg-[#DDDDDD] text-white mt-8 rounded-md p-2 w-full" type='submit'>
                      Iniciar Sesión
                    </button>
                  </form>
                )
              ) : (
                !showForm ? (
                  <>
                
                    <img src={O} alt="O" />
                    <img
                      src={RegistrarseConCorreo}
                      alt="Registrarse con Correo"
                      className="cursor-pointer"
                      onClick={handleContinueWithEmail}
                    />
                  </>
                ) : (
                  <form className="w-full" onSubmit={handleRegisterFormSubmit}>
    <input
        type="text"
        placeholder="Nombre de usuario"
        className="border rounded-md p-2 mb-4 w-full"
        value={username}
        onChange={handleUsernameChange}
    />

    <input
        type="email"
        placeholder="Email"
        className="border rounded-md p-2 mb-4 w-full"
        value={email}
        onChange={handleEmailChange}
    />

    <input
        type="password"
        placeholder="Contraseña"
        className="border rounded-md p-2 mb-4 w-full"
        value={password}
        onChange={handlePasswordChange}
    />
    <button className="bg-[#DDDDDD] text-white rounded-md p-2 w-full" type="submit">
        Crear Cuenta
    </button>
</form>
                )
              )}
              <h1 className='w-[70vh]'>Al {isLogin ? 'iniciar sesión' : 'crear una cuenta'} acepto los <span className='text-[#05BEB4]'>Términos y Condiciones</span> y confirmo que he leído la <span className='text-[#05BEB4]'>Política de Privacidad</span></h1>
              <h1>¿No tienes cuenta? <span className='text-[#05BEB4]' onClick={() => {
                setIsLogin(!isLogin);
                setShowForm(false);
              }}>{isLogin ? 'Crear cuenta' : 'Iniciar sesión'}</span></h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;





