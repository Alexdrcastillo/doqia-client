import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

const FormClient = () => {

   const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    is_client: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://doqia-backend.onrender.com/users', formData);
      console.log('User created:', response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate("/")
    } catch (error) {
      console.error('Error creating user:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '115vh', fontFamily: "Sans-serif" }}>
      <div style={{ 
        backgroundColor: "white",
        width: "60vh", 
        borderRadius: "20px", 
        marginTop: "-15vh",
        height: "80vh", 
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Link style={{ color: "#45586E", marginTop: "-3vh", marginLeft: "-1vh", display: "flex", gap: "46vh" }} to="/">
          <ArrowBackIcon />
          <CloseIcon />
        </Link>
        <form onSubmit={handleSubmit}>
          <div style={{ color: "#84BED3", marginTop: "1vh", marginLeft:"14vh" }}>
            <h1 style={{ marginTop: "1vh" }}>Crear Cuenta</h1>
            <TextField
              id="outlined-email-input"
              name="email"
              label="Email"
              autoComplete="current-email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                marginTop: "5vh",
                backgroundColor: "#F9FAFB",
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#84BED3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#84BED3',
                  },
                },
              }}
            />
            <TextField
              id="outlined-username-input"
              name="username"
              label="Nombre y Apellido"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              sx={{
                marginTop: "5vh",
                backgroundColor: "#F9FAFB",
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#84BED3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#84BED3',
                  },
                },
              }}
            />
            <TextField
              id="outlined-password-input"
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                marginTop: "5vh",
                backgroundColor: "#F9FAFB",
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#84BED3',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#84BED3',
                  },
                },
              }}
            />
          </div>
       
          <p style={{width: "55vh", textAlign: "center", marginLeft:"2vh"}}>Al crear una cuenta acepto los <span style={{color: "#84BED3"}}>Términos y Condiciones</span> y confirmo que he leído la <span style={{color: "#84BED3"}}>Política de Privacidad</span></p>
         
          <Button variant="contained" type='submit' style={{marginLeft: "18vh", backgroundColor: "#84BED3"}}>Crear Cuenta</Button>
        </form>
      </div>
    </div>
  );
}

export default FormClient;
