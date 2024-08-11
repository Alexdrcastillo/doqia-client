import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Ajustes from "./imagenesParaImagenesSubidas/ajustes.png";
import AgregarDocumento from "./imagenesParaImagenesSubidas/agregarDocumento.png";
import Documento from "./imagenesParaImagenesSubidas/documento.png";

const MisFamiliares = () => {
    const [userData, setUserData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [upload_date, setUploadDate] = useState('');
    const [subirDocumento, setSubirDocumento] = useState(false);
    const [showUpdateDocument, setShowUpdateDocument] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    const [familiares, setFamiliares] = useState([]);
    const [nombre, setNombre] = useState('');
    const [parentesco, setParentesco] = useState('');

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userId = user.id;

    useEffect(() => {
        const fetchFamiliares = async () => {
          try {
            const response = await axios.get(`http://backend.doqia.es/users/${userId}/familiares`);
            setFamiliares(response.data.familiares);
          } catch (error) {
            console.error('Error al obtener familiares:', error);
          }
        };
        fetchFamiliares();
      }, []);
      
    const fileInputRef = useRef(null);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://backend.doqia.es/users/${userId}/images`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { images } = userData;

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);
            formData.append('description', description);
            formData.append('upload_date', upload_date);

            await axios.post(`http://backend.doqia.es/users/${userId}/upload_image`, formData);

            // Refetch user data to update the images list
            fetchUserData();

            // Reset selected image, description and upload date
            setSelectedImage(null);
            setDescription('');
            setUploadDate('');
            setSubirDocumento(false)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUpdateImage = async () => {
        setShowUpdateDocument(true);
        if (!selectedImage) {
            console.error('No image selected');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('description', newDescription);

            await axios.put(`http://backend.doqia.es/users/${userId}/images/${selectedImage.id}`, formData);

            // Refetch user data to update the images list
            fetchUserData();

            // Reset selected image and description
            setSelectedImage(null);
            setNewDescription('');
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };
    const handleDownloadImage = async (image_url) => {
        setShowUpdateDocument(true);
        if (!selectedImage) {
            console.error('No image selected');
            return;
        }
    
        try {
            // Ajustar el formato de la URL para manejar barras diagonales
            let adjustedUrl = image_url.replace(/\\/g, '/');
            
            // Obtener solo el nombre del archivo con la extensión
            let filename = adjustedUrl.substring(adjustedUrl.lastIndexOf('/') + 1);
            console.log(filename);
    
            // Hacer la solicitud GET para descargar la imagen
            const response = await axios({
                url: `https://doqia-backend.onrender.com/download/image/${filename}`,
                method: 'GET',
                responseType: 'blob', // Importante: indicar que la respuesta es un blob (archivo binario)
            });
    
            // Crear un objeto URL para el blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
    
            // Crear un enlace temporal para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Establecer el nombre de descarga
            document.body.appendChild(link);
            link.click();
    
            // Limpiar el objeto URL y el enlace
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
    
            // Refrescar los datos de usuario para actualizar la lista de imágenes
            fetchUserData();
    
            // Reiniciar la imagen seleccionada y la descripción
            setSelectedImage(null);
            setNewDescription('');
    
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };
    

    const handleDeleteImage = async () => {
        if (!selectedImage) {
            console.error('No image selected');
            return;
        }

        try {
            await axios.delete(`https://doqia-backend.onrender.com/users/${userId}/images/${selectedImage.id}`);

            // Refetch user data to update the images list
            fetchUserData();

            // Reset selected image and description
            setSelectedImage(null);
            setNewDescription('');
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleUpdateDocumentClick = (image) => {
        setSelectedImage(image);
        setNewDescription(image.description);
        setShowUpdateDocument(true);
    };

    const closeUpdateDocument = () => {
        setShowUpdateDocument(false);
    };

    const handleAddFamiliar = async () => {
        try {
          const response = await axios.post(`https://doqia-backend.onrender.com/users/${userId}/familiares`, {
            nombre,
            parentesco
          });
          console.log(response.data.message);
          // Actualizar lista de familiares después de agregar uno nuevo
          fetchFamiliares();
          // Limpiar campos después de agregar familiar
          setNombre('');
          setParentesco('');
          // Ocultar formulario de agregar
          setShowAddForm(false);
        } catch (error) {
          console.error('Error al agregar familiar:', error);
        }
      };
    

    return (
        <div style={{ zIndex: 500, position: 'relative' }}>
            <div style={{ position: 'relative', filter: subirDocumento ? 'blur(5px)' : 'none' }}>
                <img src={Ajustes} className='w-[6vh] mt-[-12vh] sm:mt-[-8vh] mb-12' alt="" />
                {familiares.length === 0 ? (

                    <div>
                        <h1 className='text-[#3F6267]'>Todavía no tienes ningún familiar registrado</h1>
                        <p className='text-[#8792A0]'>Puedes añadir a tus padres, abuelos o hermanos y solicitar un servicio para ellos</p>
                        <img src={AgregarDocumento} className='mt-12 ml-[35vh]' onClick={() => setSubirDocumento(true)} alt="" />
                    </div>
                ) : (
                    <div>
                        {familiares.map((familiar, index) => (
                            <div key={index} className='mt-[10vh] border rounded-lg '>
                                <p className='text-[#3F6267] ml-[-30vh]'>{familiar.nombre}</p>
                                <p className='text-[#82BFD6]  text-[3.5vh]'>{familiar.parentesco}</p>


                            </div>
                        ))}
                        <img src={AgregarDocumento} className='mt-12 ml-[18vh] sm:ml-[34vh]' onClick={() => setSubirDocumento(true)} alt="" />
                    </div>
                )}
            </div>

            {subirDocumento && (
                <>
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 99999 }} onClick={() => setSubirDocumento(false)}></div>
                    <div className='w-[55vh] h-[60vh] fixed mt-[20vh] bg-white rounded-[4vh]' style={{ zIndex: 100000, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: "auto" }}>
                        <h1 className='text-[#3F6267] text-[3vh] ml-[-33vh] mt-[5vh]'>Nuevo familiar</h1>
                        <p className='text-[#3F6267] text-[3vh] ml-[-3vh] mt-[5vh] text-[1.56vh]'>Al añadir a tus familiares, podrás solicitar servicios para ellos fácilmente!</p>
                        <div className='mt-[7vh]'>
                        <input type="text" placeholder="Nombre"    className="border border-black p-1 w-[50vh] mb-4 placeholder:text-indent"   value={nombre} onChange={e => setNombre(e.target.value)} />
                        <input type="text" placeholder="Parentesco"  className="border border-black p-1 w-[50vh] mb-4 placeholder:text-indent"  value={parentesco} onChange={e => setParentesco(e.target.value)} />
                        </div>
                        <img src={AgregarDocumento} className='ml-[23vh] mt-[7vh]' alt="Seleccionar imagen" onClick={handleAddFamiliar} />
                    </div>
                </>
            )}

            {showUpdateDocument && selectedImage && (
                <div>
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 99999 }} onClick={closeUpdateDocument}></div>
                    <div className='w-[50vh] fixed h-[60vh] mt-[10vh] bg-white rounded-[4vh]' style={{ zIndex: 100000, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: "auto" }}>
                        <h1 className='text-[#3F6267] text-[3vh] mt-[5vh]'>Actualizar Documento</h1>
                        <div className='mt-[7vh]'>
                          
                            <input
                                type="text"
                                className='border border-black w-[42vh] mb-3 pl-2'      
                                placeholder="Nombre: Ej: Examen de sangre"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </div>
                        <div className=' wrap w-[17vh] ml-[16vh] '>
                            <button className='mb-3 bg-[#3F6267] w-[14vh] text-white rounded-lg' onClick={handleUpdateImage}>Renombrar</button>
                            <button className='mb-3 bg-[#3F6267] w-[14vh] text-white rounded-lg'  onClick={() => handleDownloadImage(selectedImage.image_url)} >Descargar</button>
                            <button className='mb-3 bg-[#82BFD6] w-[14vh] rounded-lg' onClick={handleDeleteImage}>eliminar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MisFamiliares;
