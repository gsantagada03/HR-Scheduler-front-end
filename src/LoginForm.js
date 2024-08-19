import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[error, setError] = useState('');
    const[usernameError, setUsernameError] = useState('');
    const[passwordError, setPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const payload = {
            username: username,
            password: password
        };
    
        fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token); // Salva il token nel localStorage
            }
        
            if (data.redirect) {
                window.location.href = data.redirect; // Reindirizza se è necessario cambiare la password
            } else {
                window.location.href = "/home-admin"; // Reindirizza alla home se non c'è un redirect specifico
            }
        })
        .catch(error => {
            console.error("Error:", error);
            setError("Username o password errati");
        });
    }

    return (
        <div className="login-container">
            <Card variant="outlined" className="login-card" style={{borderRadius:"40px"}}>
                <CardContent>
                    <h1 id="login-title">ACCEDI</h1>
                    {error && <Alert style={{ marginBottom: '10px' }} severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                    {usernameError && <Alert style={{ marginBottom: '10px' }} severity="error">{usernameError}</Alert>}
                    {passwordError && <Alert severity="error">{passwordError}</Alert>}
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={() => {
                                if (!username){
                                    setUsernameError("Inserisci l'username");
                                }else{
                                    setUsernameError('');
                                }
                            }}
                            fullWidth
                            margin="normal"
                            style={{ marginTop: '14%' }} 
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={ ()=>{
                                if(!password){
                                    setPasswordError("Inserisci la password");
                                }else{
                                    setPasswordError("");
                                }
                            } }
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" id = "login-button">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginForm;
