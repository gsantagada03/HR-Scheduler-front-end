import React from "react";
import AdminNavbar from "./AdminNavbar";
import Card from '@mui/material/Card';




const CreateHR = () => {


    return(
        <div className="registration-HR-container">
      <AdminNavbar/>
      <div id="card-container">
      <Card variant="outlined" className="login-card" style={{borderRadius:"20px", border:"1px solid grey"}}>
        <h1>Crea HR account</h1>
        <hr className="title-line" />
        </Card>
        </div>

      </div>
    )
}


export default CreateHR;