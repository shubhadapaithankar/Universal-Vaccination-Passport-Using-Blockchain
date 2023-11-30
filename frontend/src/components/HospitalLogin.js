import {
  Button,
  Container,
  Link,
  Paper,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { API_URL } from "../apiConfig";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HospitalLogin = ({ setIsAuth, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const response = await fetch(API_URL + "/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => res.json());

    if (response.status === "400") {
      setOpen(true);
    } else {
      localStorage.setItem("token", response.user.token);
      setIsAuth(true);

      if (email === "admin@gmail.com") {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        navigate("/uploadCSV");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
        <h1>Login</h1>
        <p>Login for hospital employees and site admin</p>
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "10px", marginTop: "5px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/hospitalRegistration")}
        >
          <Link className="regLink">Don't have an account? Register here</Link>
        </div>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          Wrong email or password
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HospitalLogin;
