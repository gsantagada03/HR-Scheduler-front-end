import React, { useState, useEffect } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.title = "Login | HR-Scheduler"; // Cambia il titolo per questa sezione
    }, []);

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
            .then(response => response.text())
            .then(token => {
                localStorage.setItem("token", token);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="login-container">
        </div>
    );
}

export default LoginForm;
