import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const VisualizeAllHR = () => {
    const [HRs, setHRs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch('http://localhost:8080/admin/get-all-HRs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setHRs(data)
            })
    }, [])
    return (
        <div id="home-container">
            <h1 id='title-home'>HR-Scheduler</h1>
            <hr id='home-line' />
            <AdminNavbar />
            <div id='hr-list'>
                {HRs.map((hr, index) => (
                    <div id='visualize-HRs' key={index}>
                                        <Card id = "hr-card">

                       <img style={{width : "225px", height: "30vh"}} src={`data:image/${hr.imageType};base64,${hr.image}`} alt="HR" />
                        <p>Nome: {hr.name}</p>
                        <p>Cognome: {hr.surname}</p>
                        <p>Username: {hr.username}</p>
                        <p>Numero di telefono: {hr.phone}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VisualizeAllHR;