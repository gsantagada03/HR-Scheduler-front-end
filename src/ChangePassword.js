import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useEffect(() => { document.title = "Cambia password | HR-Scheduler"; });

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (passwordError || confirmPasswordError) {
            return;
        }

        const payload = { password : password };
        fetch("http://localhost:8080/admin/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                window.location.href = data.redirect;
            })
            .catch(error => {
                console.error("Error", error);
            });
    }

    return (
        <div className="login-container">
            <Card variant="outlined" className="login-card">
                <CardContent>
                    <h1 id="password-change">CAMBIA PASSWORD</h1>
                    <form onSubmit={handleSubmit}>
                        {passwordError && <Alert style={{ marginBottom: '10px' }} severity="error">{passwordError}</Alert>}
                        {confirmPasswordError && <Alert style={{ marginBottom: '10px' }} severity="error">{confirmPasswordError}</Alert>}
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => {
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                if (!password) {
                                    setPasswordError("Inserisci la password");
                                } else if (!passwordRegex.test(password)) {
                                    setPasswordError("La password deve contenere almeno 8 caratteri, includendo una lettera maiuscola, una minuscola, un numero e un carattere speciale.");
                                } else {
                                    setPasswordError("");
                                }
                            }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Conferma password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() => {
                                if (!confirmPassword) {
                                    setConfirmPasswordError("Inserisci la password di conferma");
                                } else if (confirmPassword !== password) {
                                    setConfirmPasswordError("Le due password non coincidono");
                                } else {
                                    setConfirmPasswordError('');
                                }
                            }}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" id="login-button">
                            Cambia password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ChangePassword;
