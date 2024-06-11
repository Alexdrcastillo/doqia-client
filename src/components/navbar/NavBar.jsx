import React, { useEffect, useState } from 'react';
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

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [showUserOptions, setShowUserOptions] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('https://doqia-backend.onrender.com/users');
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

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://doqia-backend.onrender.com/users', {
        username: username,
        email: email,
        password: password,
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));
      setShowModal(false);
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error al crear usuario');
    }
  };

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <div className="relative">
      <div className={`bg-[#A7D2E2] mt-[-40vh] h-10 ${showModal ? 'blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex">
            <div className="text-white text-xl font-bold mt-2">
              Paciente
            </div>
            <div className="text-white text-xl font-bold mt-2 ml-4">
              Profesional de salud
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] mt-1 h-32 w-full flex items-center justify-between">
          <img src={Logo} className="w-[60vh] mt-[-8.5vh]" alt="Logo" />
          <h1 className="text-[#82BFD6] text-lg items-center ml-[110vh] mr-4">Empresas</h1>
          <div>
  {!user ? (
    <div className="w-[15vh] mt-[7vh] border border-black rounded-lg px-1 py-1 border-[#545454] text-[#545454] flex items-center ml-auto mr-4 cursor-pointer" onClick={toggleDropdown} style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      <AccountCircleIcon />
      Acceder
    </div>
  ) : (
    <div className="relative">
      <div className="w-[15vh] mt-[7vh] border border-black rounded-lg px-1 py-1 border-[#545454] text-[#545454] flex items-center ml-auto mr-4 cursor-pointer" onClick={handleUserClick} style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <AccountCircleIcon />
        {user.username}
      </div>
      {showUserOptions && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-[20vh]">
          <div className="py-2 px-4 cursor-pointer" onClick={handleLogout}>Cerrar sesión</div>
        </div>
      )}
    </div>
  )}

 
            <div className="flex ml-[-170vh] gap-4 mt-[-10vh]">
              <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
                <img src={MedicinaGeneral} className="w-6 ml-2" alt="" />
                <p className="mt-0.5 ml-3"> Medicina General</p>
              </div>
              <div className="border mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
                <img src={Fisioterapia} className="w-7 h-[4.6vh] ml-2" alt="" />
                <p className="mt-0.5 ml-3">Fisioterapia</p>
              </div>
              <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
                <img src={Nutricion} className="w-6 ml-2" alt="" />
                <p className="mt-0.5 ml-3">Nutrición</p>
              </div>
              <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
                <img src={Psicologia} className="w-7 ml-2" alt="" />
                <p className="mt-0.5 ml-3">Psicología</p>
              </div>
              <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
                <img src={Deporte} className="w-8 ml-2" alt="" />
                <p className="mt-0.5 ml-3">Deporte</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!localStorage.getItem('user') && showDropdown && (
        <div className="absolute right-4 top-20 mt-12 bg-white border border-gray-300 rounded-lg shadow-lg w-[20vh]">
          <div className="py-2 px-4 cursor-pointer" onClick={handleLogin}>Iniciar sesión</div>
          <div className="py-2 px-4 cursor-pointer" onClick={handleRegister}>Crear cuenta</div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[85vh] text-center h-[80vh] relative">
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
                    <img src={ContinuarConFaceBoton} alt="Continuar con Facebook" />
                    <img src={ContinuarConGoogleBoton} alt="Continuar con Google" />
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
                      className="border rounded-md p-2 mb-4 w-full"
                      onChange={handleEmailChange}
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border rounded-md p-2 mb-4 w-full"
                      onChange={handlePasswordChange}
                    />
                    <h1 className='text-[#05BEB4] ml-[40vh]'>¿Has olvidado tu contraseña?</h1>
                    <button className="bg-[#DDDDDD] text-white mt-8 rounded-md p-2 w-full" type='submit'>
                      Iniciar Sesión
                    </button>
                  </form>
                )
              ) : (
                !showForm ? (
                  <>
                    <img src={ContinuarConFaceBoton} alt="Continuar con Facebook" />
                    <img src={ContinuarConGoogleBoton} alt="Continuar con Google" />
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
                      onChange={handleUsernameChange}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      className="border rounded-md p-2 mb-4 w-full"
                      onChange={handleEmailChange}
                    />

                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border rounded-md p-2 mb-4 w-full"
                      onChange={handlePasswordChange}
                    />
                    <button className="bg-[#DDDDDD] text-white rounded-md p-2 w-full" type='submit'>
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





