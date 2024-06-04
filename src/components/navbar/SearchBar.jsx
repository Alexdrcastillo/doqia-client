import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://doqia-backend.onrender.com/services');
      const filteredResults = response.data.filter(service => {
        return service.address.toLowerCase() === address.toLowerCase()
          && service.occupation.toLowerCase().includes(occupation.toLowerCase());
      });
      setSearchResults(filteredResults);

      // Verifica si hay resultados y redirige si es necesario
      if (filteredResults.length > 0) {
        navigate('/results', { state: { results: filteredResults } }); // Utiliza navigate para redirigir a la ruta '/results'
      }
    } catch (error) {
      console.error('Error searching for services:', error);
    }
  };

  console.log(searchResults)
  

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  
  
  return (   
    <div style={{display: "flex"}}>
      <Search>
        <SearchIcon style={{marginTop: "1vh"}}   onClick={handleSearch} />
        <StyledInputBase
          placeholder="Servicio"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <Search style={{ marginLeft: "-2.5vh" }}>
        <StyledInputBase style={{marginTop: "1vh"}}
          placeholder="Direccion"
          value={address}
        
          onChange={(e) => setAddress(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

        

    

      <ul>
        {searchResults.map(service => (
          <li key={service.id}>
            {service.description} - {service.address}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default SearchBar;
