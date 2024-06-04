import { useRef, useEffect, useState } from "react";
import HouseIcon from '@mui/icons-material/House';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SpaIcon from '@mui/icons-material/Spa';
import PetsIcon from '@mui/icons-material/Pets';
import FaceIcon from '@mui/icons-material/Face';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";
import RegisterOrLogin from "../sesion/RegisterOrLogin";
import { Link } from "react-router-dom";

function NavBar() {
    const navRef = useRef();
    const [showOptionsBox, setShowOptionsBox] = useState(false);
    const [showRegisterOptions, setShowRegisterOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [registerOption, setRegisterOption] = useState("");
    const [user, setUser] = useState(null);

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
        };

        if (navRef.current) {
            navRef.current.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (navRef.current) {
                navRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    const toggleOptions = () => {
        setShowOptionsBox(!showOptionsBox);
    };

    const handleRegisterOption = (option) => {
        setRegisterOption(option);
        setShowRegisterOptions(false);
    };

    const handleCreateAccountClick = () => {
        setShowOptionsBox(false);
        setShowRegisterOptions(true);
    };

    const handleCloseRegisterOptions = () => {
        setShowRegisterOptions(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setShowOptionsBox(false);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap");

                * {
                  padding: 0;
                  margin: 0;
                  box-sizing: border-box;
                  font-family: "Titillium Web", sans-serif;
                }

                :root {
                  --mainColor: #29335c;
                  --mainColorLight: #5767aa;
                  --secondaryColor: #db2b39;
                  --textColor: #eee;
                }

                header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  height: 80px;
                  padding: 0 2rem;
                  background-color: #84BED1;
                  color: var(--textColor);
                  z-index: 1000;
                }

                nav a {
                  margin: 0 1rem;
                  color: var(--textColor);
                  text-decoration: none;
                }

                nav a:hover {
                  color: var(--secondaryColor);
                }

                header .nav-btn {
                  padding: 5px;
                  cursor: pointer;
                  background: #84BED1;
                  border: none;
                  outline: none;
                  color: var(--textColor);
                  visibility: hidden;
                  opacity: 0;
                  font-size: 1.8rem;
                }

                header div,
                nav {
                  display: flex;
                  align-items: center;
                  color: #45586E;
                  margin-top: 23vh;
                  margin-left: 5vh;
                }

                .buttons {
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  margin: 5px;
                  border: 1.2px solid black;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .buttons a {
                  margin-left: 10px;
                  color: #45586E;
                  text-decoration: none;
                }

                .options-container {
                  position: absolute;
                  top: 60px;
                  right: 10px;
                  border: 1px solid #000;
                  border-radius: 10px;
                  background-color: white;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                  padding: 10px;
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                }

                .option-button {
                  padding: 10px;
                  cursor: pointer;
                  border: none;
                  background-color: #f0f0f0;
                  border-radius: 3px;
                }

                .option-button:hover {
                  background-color: #e0e0e0;
                }

                @media only screen and (max-width: 1024px) {
                  header .nav-btn {
                    visibility: visible;
                    opacity: 1;
                  }

                  header nav {
                    position: fixed;
                    top: -100vh;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    background-color: #84BED1;
                  }

                  header .responsive_nav {
                    transform: translateY(100vh);
                  }

                  nav .nav-close-btn {
                    position: absolute;
                    top: 2rem;
                    right: 2rem;
                  }

                  nav a {
                    font-size: 1.5rem;
                  }
                }
            `}</style>

            <header>
                <img src="https://media.licdn.com/dms/image/D4D03AQESeidv-KKHSw/profile-displayphoto-shrink_800_800/0/1715365853077?e=1722470400&v=beta&t=USoq2hSsiEukNaXDl68TSx7z_uuqDEx--RguYG0BwBE" alt="" />
                
                <nav ref={navRef}>
                    <div className="buttons">
                        <HouseIcon />
                        <a href="/#">Hogar</a>
                    </div>
                    <div className="buttons">
                        <MenuBookIcon />
                        <a href="/#">Clases</a>
                    </div>
                    <div className="buttons">
                        <SportsGymnasticsIcon />
                        <a href="/#">Deportes</a>
                    </div>
                    <div className="buttons">
                        <WidgetsIcon />
                        <a href="/#">Otros</a>
                    </div>
                    <div className="buttons">
                        <SpaIcon />
                        <a href="/#">Cuidados</a>
                    </div>
                    <div className="buttons">
                        <FaceIcon />
                        <a href="/#">Belleza</a>
                    </div>
                    <div className="buttons">
                        <PetsIcon />
                        <a href="/#">Mascotas</a>
                    </div>
                </nav>
                
                <div>
                    <a style={{ textDecoration: "none", color: "white", marginBottom: "20vh", marginLeft: "-50px" }} href="/#">Ofrecer servicios</a>
                </div>

                <div style={{ position: 'relative', marginLeft: "9vh", marginTop: "-20vh" }}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer", borderRadius: "12px", border: "1px solid black", marginLeft: "-3vh", padding: "8px" }} onClick={toggleOptions}>
                        <AccountCircleIcon />
                        <span style={{ marginLeft: "8px", color: "black" }}>{user ? user.username : "Acceder"}</span>
                    </div>
                    {showOptionsBox && (
                        <div className="options-container" style={{ width: "30vh" }}>
                          {user ? (
                            <>
                              <Link to="/profile" style={{ textDecoration: "none", color: "#45586E" }}>
                                <button className="option-button" style={{ border: "1px solid #45586E", borderRadius: "10px", color: "#45586E", width: "20vh" }}>Perfil</button>
                              </Link>
                              <Link to="/services" style={{ textDecoration: "none", color: "#45586E" }}>
                                <button className="option-button" style={{ border: "1px solid #45586E", borderRadius: "10px", color: "#45586E", width: "20vh" }}>Servicios</button>
                              </Link>
                              <button onClick={handleLogout} className="option-button" style={{ border: "1px solid #45586E", borderRadius: "10px", color: "#45586E", width: "20vh" }}>Cerrar sesión</button>
                            </>
                          ) : (
                            <>
                              <Link to="/login" style={{ textDecoration: "none", color: "#45586E" }}>
                                <button className="option-button" style={{ border: "1px solid #45586E", borderRadius: "10px", color: "#45586E", width: "20vh" }}>Iniciar sesión</button>
                              </Link>
                              <button onClick={handleCreateAccountClick} className="option-button" style={{ border: "1px solid #45586E",backgroundColor: "#84BED1", borderRadius: "10px", color: "#45586E", width: "20vh" }}>Crear cuenta</button>
                            </>
                          )}
                        </div>
                    )}
                </div>

                    
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <span>&times;</span>
                </button>
                <button className="nav-btn" onClick={showNavbar}>
                    <span>&#9776;</span>
                </button>
            </header>

            {showRegisterOptions && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <h2>Elige una opción</h2>
                        <button onClick={() => handleRegisterOption('ofrecer')}>Ofrecer servicios</button>
                        <button onClick={() => handleRegisterOption('recibir')}>Recibir servicios</button>
                        <button onClick={handleCloseRegisterOptions}>Cerrar</button>
                    </div>
                </div>
            )}
<div style={{ marginTop: "-10vh", marginLeft: "40vh" }}>
                <SearchBar />
            </div>
            <div style={{marginLeft:"80vh", marginTop:"20vh"}}>
            {showRegisterOptions && (
                        <RegisterOrLogin selectedOption={selectedOption} onClose={handleCloseRegisterOptions} />
                    )}
            </div>
        </>
    );
}

export default NavBar;
