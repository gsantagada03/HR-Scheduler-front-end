import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';


const HomeAdmin = () => {
    return (
        <div id="home-container">
            <h1 id='title-home'>HR-Scheduler</h1>
            <hr id='home-line'/>
            <AdminNavbar/>
            <div id='img-background'>
                <h1 id='image-title' class ="image-text">HR-Scheduler</h1>
                <h2 class ="image-text">Gestisci facilmente i tuoi team e le risorse umane con HR-Scheduler. Crea, monitora e organizza account per HR e dipendenti in modo efficiente e sicuro</h2>
            </div>
            </div>
    );
}

export default HomeAdmin;