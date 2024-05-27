
import { useRef, useEffect } from "react";

import HouseIcon from '@mui/icons-material/House';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SpaIcon from '@mui/icons-material/Spa';
import PetsIcon from '@mui/icons-material/Pets';
import FaceIcon from '@mui/icons-material/Face';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from "./SearchBar";

function NavBar() {
    const navRef = useRef();

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
                  border-radius: 8px; /* Bordes redondeados */
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra gris */
                }

                .buttons a {
                  margin-left: 10px;
                  color: #45586E;
                  text-decoration: none;
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
                    /* transition: 1s; */
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
              <img  src="https://media.licdn.com/dms/image/D4D03AQESeidv-KKHSw/profile-displayphoto-shrink_800_800/0/1715365853077?e=1722470400&v=beta&t=USoq2hSsiEukNaXDl68TSx7z_uuqDEx--RguYG0BwBE" alt="" />
              
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
                    <SportsGymnasticsIcon/>
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
                <a style={{textDecoration: "none", color: "white", marginBottom: "20vh", marginLeft: "-50px"}} href="/#">Ofrecer servicios</a>
              </div>

              <div style={{borderRadius: "15px", height: "40px", width: "130px", border: "1px solid black", marginBottom: "20vh", background: "white", display: "flex",marginLeft: "4vh", justifyContent: "center", alignItems: "center"}}>
                <AccountCircleIcon />
                <a style={{borderRadius: "50%", textDecoration: "none", color: "black"}} href="/#">Acceder</a>
              </div>
            </header>
            <div style={{marginTop: "-10vh", marginLeft:"40vh"}}>
                <SearchBar />
            </div>
        </>
    );
}

export default NavBar;
