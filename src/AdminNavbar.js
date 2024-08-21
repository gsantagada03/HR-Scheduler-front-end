import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const AdminNavbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav id="admin-navbar">
            <Link to="/home-admin">
                <button>HOME</button>
            </Link>
            <div className="dropdown-container" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <button>GESTISCI HR MANAGER</button>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <Link to="/crea-HR">
                            <button>Aggiungi HR</button>
                        </Link>
                        <Link to="/visualizza-HR-managers">
                            <button>Visualizza HR</button>
                        </Link>
                        <button>Rimuovi HR</button>
                    </div>
                )}
            </div>
            <button>MODIFICA PASSWORD</button>
            <button>LOGOUT</button>
        </nav>
    );
};

export default AdminNavbar;