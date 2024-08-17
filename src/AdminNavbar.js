import React, { useState } from 'react';


const AdminNavbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav id="admin-navbar">
            <button>HOME</button>
            <div className="dropdown-container" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <button>GESTISCI HR MANAGER</button>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button>Aggiungi HR</button>
                        <button>Visualizza HR</button>
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