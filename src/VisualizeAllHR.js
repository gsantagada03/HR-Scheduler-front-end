import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';




const VisualizeAllHR = () => {
    const [HRs, setHRs] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
    const [warningAlert, setWarningAlert] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState(false);
    const [succesfulDeleteAlert, setSuccesfulDeleteAlert] = useState(false);


    const handleCloseAlert = () => {
        setWarningAlert(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (location.search.includes("registered=true")) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        }

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

    const deleteAccount = (selectedUsername) => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/admin/delete-HR", {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ username: selectedUsername })
        })

            .then(response => {
                if (response.ok) {
                    setHRs(prevHRs => prevHRs.filter(hr => hr.username !== selectedUsername));
                    setSuccesfulDeleteAlert(true);
                    setTimeout(() => setSuccesfulDeleteAlert(false),5000)

                }
            })
    }


    useEffect(() => {
        if (warningAlert) {
            document.body.classList.add("no-scroll");

        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove('no-scroll');

    }, [warningAlert])


    return (
        <div id="home-container">
            <h1 id='title-home'>HR-Scheduler</h1>
            <hr id='home-line' />
            <AdminNavbar />
            {showAlert && (
                <Alert id='successful-registration' icon={<CheckIcon fontSize="inherit" />} severity="success">
                    Account registrato con successo!
                </Alert>
            )}
             {succesfulDeleteAlert && (
                    <Alert id='successful-elimination' icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Account eliminato con successo!
                    </Alert>
                )}


            <div id='hr-list'>

                {warningAlert && (
                    <div className="overlay">
                        <div className="alert-container">
                            <Alert severity="warning">
                                <button className="close-btn" onClick={handleCloseAlert}>×</button>
                                Sei sicuro di voler eliminare questo account?
                                <div>
                                    <button onClick={() => {deleteAccount(selectedUsername); handleCloseAlert()}} style={{ cursor: "pointer", marginTop: "10px", width: "300px" }} >Elimina account</button>
                                </div>
                            </Alert>
                        </div>
                    </div>
                )}
                {HRs.map((hr, index) => (
                    <div id='visualize-HRs' key={index}>
                        <Card id="hr-card">

                            <img style={{ width: "225px", height: "30vh" }} src={`data:image/${hr.imageType};base64,${hr.image}`} alt="HR" />
                            <p>Nome: {hr.name}</p>
                            <p>Cognome: {hr.surname}</p>
                            <p>Username: {hr.username}</p>
                            <p>Numero di telefono: {hr.phone}</p>
                            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'red' }} onClick={() => { setWarningAlert(true); setSelectedUsername(hr.username) }}>
                                <IconButton aria-label="delete" style={{ padding: 0, color: "red" }}>
                                    <DeleteIcon />
                                </IconButton>
                                <span style={{ marginLeft: '5px' }}>Elimina account</span>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VisualizeAllHR;