import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Ajustes from "./imagenesParaImagenesSubidas/ajustes.png";
import AgregarDocumento from "./imagenesParaImagenesSubidas/agregarDocumento.png";
import Documento from "./imagenesParaImagenesSubidas/documento.png";

const  ImagenesSubidas = () => {
    const [userData, setUserData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [upload_date, setUploadDate] = useState('');
    const [subirDocumento, setSubirDocumento] = useState(false);
    const [showUpdateDocument, setShowUpdateDocument] = useState(false);
    const [newDescription, setNewDescription] = useState('');
    

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userId = user.id;


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
                url: `http://backend.doqia.es/download/image/${filename}`,
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
            await axios.delete(`http://backend.doqia.es/users/${userId}/images/${selectedImage.id}`);

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

    return (
        <div style={{ zIndex: 500, position: 'relative' }}>
            <div style={{ position: 'relative', filter: subirDocumento ? 'blur(5px)' : 'none' }}>
                <img src={Ajustes} className='sm:w-[6vh] w-[4vh] mt-[-12vh] sm:mt-[-8vh] mb-12' alt="" />
                {images.length === 0 ? (

                    <div>
                        <h1 className='text-[#3F6267]'>Todavía no tienes ningún documento</h1>
                        <p className='text-[#8792A0]'>Almacena tus informes médicos de manera segura y organizada</p>
                        <img src={AgregarDocumento} className='mt-12 ml-[18vh] sm:ml-[34vh]' onClick={() => setSubirDocumento(true)} alt="" />
                    </div>
                ) : (
                    <div className='sm:mt-0 mt-[10vh]'>
                        {images.map((image, index) => (
                            <div key={index} className='mb-7'>
                                <p className='text-[#3F6267] sm:ml-[-57vh]'>{image.upload_date}</p>
                                <img src={Documento} className='sm:ml-[5vh]' onClick={() => handleUpdateDocumentClick(image)} alt="" />
                                <p className='text-[#82BFD6] mt-[-6vh] sm:mt-[-9vh] text-[3.5vh]'>{image.description}</p>

                                {/* Modal */}

                            </div>
                        ))}
                        <img src={AgregarDocumento} className='mt-12 ml-[18vh] sm:ml-[34vh]' onClick={() => setSubirDocumento(true)} alt="" />
                    </div>
                )}
            </div>

            {subirDocumento && (
                <>
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 99999 }} onClick={() => setSubirDocumento(false)}></div>
                    <div className='w-[50vh] h-[60vh] fixed mt-[20vh] bg-white rounded-[4vh]' style={{ zIndex: 100000, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflowY: "auto" }}>
                        <h1 className='text-[#3F6267] text-[3vh] mt-[5vh]'>Nuevo Documento</h1>
                        <div className='mt-[7vh]'>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => handleImageSelect(e.target.files[0])} />
                            <input type="text" className='border border-black w-[42vh] mb-5' placeholder="Nombre: Ej: Examen de sangre" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <input type="text" className='border border-black w-[42vh] mb-3' placeholder="Fecha: fecha en la que te realizaste el examen" value={upload_date} onChange={(e) => setUploadDate(e.target.value)} />
                        </div>
                        <img src={AgregarDocumento} className='ml-[21vh] mt-[1vh]' alt="Seleccionar imagen" onClick={handleImageClick} />
                        <button onClick={handleImageUpload}>Subir Documento</button>
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

export default ImagenesSubidas;
