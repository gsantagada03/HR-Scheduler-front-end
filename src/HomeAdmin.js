import React from 'react';
import AdminNavbar from './AdminNavbar';

const HomeAdmin = () => {
    return (
        <div id='home-container' style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <AdminNavbar />
            <div id='title-description' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, textAlign: "center", marginBottom:"15vh"}}>
                <h1 style={{ color: "white" }}>HR-Scheduler</h1>
                <h2 style={{ color: "white", maxWidth: "80%" }}>
                    Gestisci facilmente i tuoi team e le risorse umane con HR-Scheduler. Crea, monitora e organizza account per HR e dipendenti in modo efficiente e sicuro.
                </h2>
            </div>
        </div>
    );
}

export default HomeAdmin;