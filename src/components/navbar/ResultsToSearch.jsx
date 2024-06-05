import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ResultsToSearch = () => {
  const { address, occupation } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://doqia-backend.onrender.com/services/${address}/${occupation}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };

    fetchResults();
  }, [address, occupation]);

  console.log(results);
  
  return (
    <div style={{ textAlign: "center", alignItems: "center", backgroundColor: "#F9FAFB" }}>
      <NavBar />

      <h1 style={{color: "#45586E"}}>{occupation} en {address}</h1>
<div style={{justifyContent: "center", alignItems: "center",}}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: "-30vh", marginLeft: "-10vh" }}>
      <div style={{ marginTop: "-30vh", width: "15vh", border: "1px solid black", borderRadius: "5px", height: "4vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TuneIcon style={{fontSize: "3vh", color: "#45586E"}}/>
          <p style={{ margin: 0 , marginLeft: "1vh"}}>Filtros</p>
        </div>

        <div style={{ marginTop: "-30vh", width: "15vh", border: "1px solid black", borderRadius: "5px", height: "4vh", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5vh" }}>
          <CalendarTodayIcon style={{fontSize: "3vh", color: "#45586E"}}/>
          <p style={{ margin: 0 , marginLeft: "1vh"}}>¿Cuando?</p>
        </div>

        

        {results.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map(result => (
              <li key={result.id} style={{ marginBottom: "1rem", display: "flex",flexWrap: "wrap", width:"80vh",height: "30vh", borderRadius: "10px", marginLeft: "-35vh", marginTop: "20vh",   boxShadow: "0 4px 8px rgba(0,0,0,0.8)" }}>
               <div style={{ width: "14vh", height: "14vh", borderRadius: "50px", overflow: "hidden",marginLeft: "2vh", marginTop: "2vh" }}>
    <img src="https://img.freepik.com/foto-gratis/cintura-arriba-retrato-hombre-guapo-afeitar-serio-mantiene-manos-juntas-vestido-camisa-azul-oscuro-ha-hablado-interlocutor-esta-parado-contra-pared-blanca-freelancer-hombre-seguro-si-mismo_273609-16320.jpg?t=st=1717551999~exp=1717555599~hmac=1d42ac7c78564fd6b4f9c72a40b68ca4005bf0a82f41dc84711a461982971544&w=740" alt="" style={{ width: "100%", height: "100%", objectFit: "cover"  }} />
 </div>
              
                <h1 style={{marginLeft: "3vh", marginTop: "2vh", color: "#45586E", width: "10vh"}}>{result.username}</h1>
                <h4 style={{color:"#84BED1", marginTop: "10vh", marginLeft: "-9vh"}}>{result.description}</h4>
               
                {/* Mostrar más detalles si es necesario */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default ResultsToSearch;
