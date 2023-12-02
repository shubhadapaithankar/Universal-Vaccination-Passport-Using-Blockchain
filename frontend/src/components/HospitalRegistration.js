import {
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../apiConfig";

const HospitalRegistration = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const response = await fetch(API_URL + "/api/user/register", {
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
      navigate("/uploadCSV");
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" && passwordValid) {
      onSubmit();
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
        <h1>Create an account here</h1>
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => handleEnterKey(e)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => handleEnterKey(e)}
        />
        <TextField
          id="passwordAgain"
          label="Password Again"
          variant="outlined"
          type="password"
          fullWidth
          style={{ marginBottom: "10px" }}
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          onKeyPress={(e) => handleEnterKey(e)}
        />
        <div style={{ textAlign: "start" }}>
          <PasswordChecklist
            rules={["minLength", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {
              setPasswordValid(isValid);
            }}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          disabled={!passwordValid}
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
          Email already taken
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HospitalRegistration;
