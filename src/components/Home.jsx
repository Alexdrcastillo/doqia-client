import React from 'react'
import NavBar from './navbar/NavBar'

const Home = () => {
  return (
    <div>
      <div style={{position: "fixed", marginTop: "-10vh"}}>
      <NavBar />
      </div>
      <div style={{ textAlign: "end", marginTop: "10vh" }}>
        <img style={{ width: "110vh", marginTop: "4vh" }} src="https://img.freepik.com/vector-premium/cita-medica-terapeuta-ilustracion-vector-llamada-domicilio-medico-mujer-dibujos-animados-visitando-al-paciente-enfermo-su-examen-servicio-atencion-medica-llamar-al-medico-familia-casa-aislado-blanco_212168-1192.jpg?w=740" alt="" />
      </div>

      <div style={{ color: "#45586E" }}>
        <h1 style={{ marginTop: "-55vh", marginLeft: "18vh" }}>Haz tu vida más fácil</h1>
        <h2>Disfruta cualquier servicio, en la comodidad de tu hogar</h2>
      </div>

      <div style={{ color: "#45586E", marginTop: "50vh", textAlign: "center", marginLeft: "-5vh" }}>
        <h1>¿Cómo funciona?</h1>

        <div style={{ display: "flex", textAlign: "center", alignContent: "center", alignItems: "center", margin: "20vh" }}>

          <div style={{marginRight: "8vh"}}>
            <img style={{ width: "45vh", height: "45vh" }} src="https://appwebel.com/assets/img/elements/landing_steps/step-1.webp" />
            <h2>Busca lo que necesitas</h2>
            <div style={{ width: "40vh" }}>
              <p style={{ fontSize: "14.5px" }}>Tenemos casi de todo:limpieza, clases particulares, estética...</p>
            </div>

          </div>
          <div>
            <img style={{ width: "45vh", height: "45vh" }} src="https://appwebel.com/assets/img/elements/landing_steps/step-2.webp" alt="" />
            <h2>Escoge tu profesional</h2>
            <div style={{ width: "60vh" }}>
              <p style={{ fontSize: "14.5px" }}>Compara entre cientos de profesionales disponibles y elige al que más te guste.</p>
            </div>
          </div>
          <div style={{marginLeft:"9vh"}}>
            <img style={{ width: "45vh", height: "45vh" }} src="https://appwebel.com/assets/img/elements/landing_steps/step-3.webp" alt="" />
            <h1>Contrátalo en 1 click</h1>
            <div style={{ width: "50vh" }}>
              <p style={{ fontSize: "14.5px" }}>Reserva tu servicio y quédate tranquilo con la Garantia Webel: tu dinero protegido hasta el final..</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
