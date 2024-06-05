import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Encode the parameters to handle spaces and special characters
    const encodedAddress = encodeURIComponent(address);
    const encodedOccupation = encodeURIComponent(occupation);
    // Redirect to /results/{address}/{occupation}
    navigate(`/results/${encodedAddress}/${encodedOccupation}`);
  };

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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <div style={{ display: "flex" }}>
      <Search>
        <SearchIcon style={{ marginTop: "1vh" }} onClick={handleSearch} />
        <StyledInputBase
          placeholder="Servicio"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>

      <Search style={{ marginLeft: "-2.5vh" }}>
        <StyledInputBase style={{ marginTop: "1vh" }}
          placeholder="Direccion"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  );
};

export default SearchBar;
