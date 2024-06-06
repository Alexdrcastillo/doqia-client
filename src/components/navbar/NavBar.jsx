import Logo from "../../../images/logo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicinaGeneral from "../../../images/medicoGeneralImage.png"
import Fisioterapia from "../../../images/fisioterapiaImage.png"
import Nutricion from "../../../images/NutricionImage.png"
import Psicologia from "../../../images/psicologiaImage.png"
import Deporte from "../../../images/deporteImage.png"
import Raya from "../../../images/raya.png"
import Casita from "../../../images/casa.png"
import Calendario from "../../../images/calendario.png"

function NavBar() {
  return (
    <div className="bg-[#A7D2E2] h-10">
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
        <img src={Logo} className="w-[60vh] mt-[-8.5vh] "  alt="Logo" />
        <h1 className="text-[#82BFD6] mt-[-7.5vh] text-lg items-center ml-[120vh] mr-4">Empresas</h1>
        <div className="w-[15vh] mt-[-7vh] border border-black rounded-lg px-1 py-1 border-[#545454] text-[#545454] flex items-center ml-auto mr-4">

          <AccountCircleIcon />
          Acceder
        </div>
        <div>
        <div className="flex ml-[-184vh] gap-4">
          <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex  w-[30vh] rounded-xl">
            <img src={MedicinaGeneral} className="w-6 ml-2" alt="" />
            <p className="mt-0.5 ml-3"> Medicina General</p>
          </div>
          <div className="border  mt-[12vh] bg-[#F2F2F2] flex  w-[30vh] rounded-xl">
          <img src={Fisioterapia} className="w-7 h-[4.6vh] ml-2" alt="" />
            <p className="mt-0.5 ml-3">Fisioterapia</p>
          </div>
          <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex w-[30vh] rounded-xl">
          <img src={Nutricion} className="w-6 ml-2" alt="" />
            <p className="mt-0.5 ml-3">Nutrición</p>
          </div>
          <div className="border  h-8 mt-[12vh] bg-[#F2F2F2] flex  w-[30vh] rounded-xl">
          <img src={Psicologia} className="w-7 ml-2" alt="" />
            <p className="mt-0.5 ml-3">Psicología</p>
          </div>
          <div className="border h-8 mt-[12vh] bg-[#F2F2F2] flex  w-[30vh] rounded-xl">
          <img src={Deporte} className="w-8 ml-2" alt="" />
            <p className="mt-0.5 ml-3">Deporte</p>
          </div>
        </div>
        </div>
      </div>
         <div className="text-center text-[#3F6267] mt-[10vh]">
        <h1 className="text-[8vh]">Salud de calidad desde la comodidad de tu hogar</h1>
          <img src={Casita} className="w-[25vh] mt-[-16vh] ml-[170vh]" />
        <img src={Raya} className="w-[30vh] ml-[50vh] mt-[8vh]" />
         </div>
         <div className="flex items-center mt-[-25vh] justify-center h-screen text-[#737373]">
             <div className="mt-[-20.5vh] z-40  bg-[#E8E8E8] h-10 rounded-lg w-[24vh] text-center">
              <p sty>¿Necesitas agendar?</p>
              <p className="mt-[-4vh] ml-[23vh] w-[20vh]">Cancelar ahora</p>
             </div>
            <div className="text-center z-10 w-[90vh] flex ml-[-24vh] bg-[#E8E8E8] h-[20vh] rounded-lg">
              <div className="flex mt-10 ml-5 bg-white w-[30vh]  rounded-lg h-[6vh]">
               <h1 className="mt-1.5 ml-4">Tipo de atencion</h1>
              <select name="atencion" id="" className="rounded-lg "></select>
              </div>
              <div className="flex mt-10 ml-4 bg-white w-[30vh]   rounded-lg h-[6vh]">
               <h1 className="mt-1.5 ml-5">Tipo de atencion</h1>
              <select name="atencion" id="" className="rounded-lg "></select>
              </div>
              <div className="flex mt-10 ml-4 bg-[#6D94A3] text-white w-[20vh]   rounded-lg h-[6vh]">
                <img src={Calendario} className="w-8 h-8 mt-1 ml-1" alt="" />
               <p className="mt-1.5 ml-2">Reservar</p>
              </div>
           </div>
        </div>
    </div>
  );
}

export default NavBar;
