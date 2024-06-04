import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const RegisterOrLogin = ({ selectedOption, onClose }) => {
    return (
        <div>
            <div
                style={{
                    backdropFilter: "blur(3px)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#45586E"
                }}
                onClick={onClose}
            >
                <div
                    style={{
                        width: "90vh",
                        backgroundColor: "white",
                        borderRadius: "20px",
                        marginLeft: "5vh",
                        marginTop: "1vh",
                        height: "98.7vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        padding: "20px"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div>
                        <h1 style={{ marginTop: "-5vh", textAlign: "center" }}>¿Qué quieres hacer en Doqia?</h1>
                        <p style={{ marginTop: "5vh" }}>
                            Esta decisión no es definitiva. Luego podrás ser cliente y profesional desde la misma cuenta si lo deseas. {selectedOption === 'ofrecer' ? 'Ofrecer servicios' : 'Recibir servicios'}
                        </p>
                        <Link to="register/client" style={{textDecoration: "none",color: "#45586E"}}>
                       
                        <div style={{ marginTop: "10vh" }}>
                            <div
                                style={{
                                    width: "80vh",
                                    marginLeft: "2vh",
                                    borderRadius: "20px",
                                    height: "24vh",
                                    backgroundColor: "white",
                                    border: "0.1vh solid black",
                                    display: "flex",
                                    boxShadow: "5px 12px 12px rgba(0, 0, 0, 0.3)" // Aumenta la opacidad aquí
                                }}
                            >
                                <img style={{width: "30vh",height:"22vh", marginLeft:"2vh",marginTop: "1vh",  borderRadius: "20px"}} src="data:image/jpeg;base64,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" alt="" />
                                    <h1 style={{marginLeft: "5vh"}}>Pedir Servicios</h1>
                                    <h2 style={{marginTop:"5vh", marginLeft: "-20vh"}}>(client)</h2>
                            </div>
                        </div>
                        </Link>
                        <Link to="/register/userServices" style={{textDecoration: "none",color: "#45586E"}}>
                        <div style={{ marginTop: "10vh" }}>
                            <div
                                style={{
                                    width: "80vh",
                                    marginLeft: "2vh",
                                    borderRadius: "20px",
                                    height: "24vh",
                                    backgroundColor: "white",
                                    border: "0.1vh solid black",
                                    display: "flex",
                                    boxShadow: "5px 12px 12px rgba(0, 0, 0, 0.3)" // Aumenta la opacidad aquí
                                }}
                            >
                                <img  style={{width: "30vh",height:"22vh", marginLeft:"2vh",marginTop: "1vh",  borderRadius: "20px"}}  src="https://appwebel.com/assets/img/elements/signup-professional.jpeg" alt="" />
                                <h1 style={{marginLeft: "5vh"}}>Ofrecer Servicios</h1>
                                    <h2 style={{marginTop:"5vh", marginLeft: "-28vh"}}>(Profesional)</h2>
                            </div>
                        </div>
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterOrLogin;