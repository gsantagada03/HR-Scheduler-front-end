import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Alert } from "@mui/material";

const CreateHR = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [previewImage, setPreviewImage] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const [phoneExistsError, setPhoneExistsError] = useState("");
  const [usernameExistsError, setUsernameExistsError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (nameError || surnameError || usernameError || passwordError || phoneError) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    fetch("http://localhost:8080/admin/create-HR", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setUsernameExistsError("");
        setPhoneExistsError("");

        if (!data.usernameExistsError && !data.phoneExistsError) {
          window.location.href = data.redirect;
        } else {
          if (data.usernameExistsError) {
            setUsernameExistsError("Username già esistente");
          }
          if (data.phoneExistsError) {
            setPhoneExistsError("Numero già esistente");
          }
        }
      })
  }
  return (
    <div id="create-HR-container">
      <h1 id='title-home'>HR-Scheduler</h1>
      <hr id='home-line' />
      <AdminNavbar />

      <Card id="create-hr-card" sx={{ maxWidth: 400, margin: 'auto', mt: 5, padding: 3 }}>
        <CardContent>
          <h2 id="create-HR-title">Crea HR account</h2>
          <div id="create-HR-form">

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              {usernameExistsError && (
                <Alert severity="error">{usernameExistsError}</Alert>
              )}

              {phoneExistsError && (
                <Alert severity="error">{phoneExistsError}</Alert>
              )}
              <Avatar src={previewImage} alt="Profile Image" id="avatar" />
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                <PhotoCamera />
              </IconButton>
            </div>

            <TextField
              required
              id="name-field"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={nameError}
              fullWidth
              margin="normal"
              error={Boolean(nameError)}
              onBlur={(e) => {
                if (e.target.value.trim() === "") {
                  setNameError("Inserisci il nome");
                } else {
                  setNameError("");
                }
              }}
            />
            <TextField
              required
              id="surname-field"
              label="Cognome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              helperText={surnameError}
              fullWidth
              margin="normal"
              error={Boolean(surnameError)}
              onBlur={(e) => {
                if (e.target.value.trim() === "") {
                  setSurnameError("Inserisci il cognome");
                } else {
                  setSurnameError("");
                }
              }}
            />
            <TextField
              required
              id="username-field"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              helperText={usernameError}
              error={Boolean(usernameError)}
              onBlur={(e) => {
                const value = e.target.value.trim();
                const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
                if (value === "") {
                  setUsernameError("Inserisci l'username");
                } else if (!usernameRegex.test(value)) {
                  setUsernameError("L'username deve iniziare con una lettera e avere tra 8 e 30 caratteri, con lettere, numeri o underscore.");
                } else {
                  setUsernameError("");
                }
              }}
            />
            <TextField
              type="password"
              required
              id="password-field"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              helperText={passwordError}
              error={Boolean(passwordError)}
              onBlur={(e) => {
                const value = e.target.value.trim();
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (value === "") {
                  setPasswordError("Inserisci la password");
                } else if (!passwordRegex.test(value)) {
                  setPasswordError("La password deve contenere almeno 8 caratteri, includendo una lettera maiuscola, una minuscola, un numero e un carattere speciale.");
                } else {
                  setPasswordError("");
                }
              }}
            />
            <TextField
              id="phone-field"
              label="Numero di telefono"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(phoneError)}
              helperText={phoneError}
              onBlur={(e) => {
                const value = e.target.value.trim();
                const phoneRegex = /^(\+39)?\s?3\d{2}\s?\d{6,7}$/;
                if (value !== "" && !phoneRegex.test(value)) {
                  setPhoneError("Inserisci un numero di telefono valido.");
                } else {
                  setPhoneError("");
                }
              }}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button style={{ margin: 'auto' }} variant="contained" onClick={handleSubmit}>Crea account</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CreateHR;
