import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';


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
    },[])
    return (
        <div id="home-container">
            <h1 id='title-home'>HR-Scheduler</h1>
            <hr id='home-line' />
            <AdminNavbar />
            <div id='hr-list'>
                {HRs.map((hr, index) => (
                    <div key={index} className='hr-card'>
                        <p>Name: {hr.name}</p>
                        <p>Surname: {hr.surname}</p>
                        <p>Username: {hr.username}</p>
                        <p>Phone: {hr.phone}</p>
                        <p>Image: <img src={`http://localhost:8080/photos/${hr.image}`} alt="HR" /></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VisualizeAllHR;