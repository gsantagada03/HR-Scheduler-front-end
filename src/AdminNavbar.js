import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const AdminNavbar = () => {
  return (
    <AppBar position="static" id="admin-navbar">
      <Toolbar style={{ display: "flex", justifyContent: "flex-start"}}>
        <Button>Home</Button>
        <Button>Gestisci HR Manager</Button>
        <Button>Modifica Password</Button>
        <Button>Logout</Button>      
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
