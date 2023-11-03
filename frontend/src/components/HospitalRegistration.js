import { Button, Container, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const HospitalRegistration = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

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
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          style={{ marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="passwordAgain"
          label="Password Again"
          variant="outlined"
          type="password"
          fullWidth
          style={{ marginBottom: "10px" }}
          onChange={(e) => setPasswordAgain(e.target.value)}
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
        >
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default HospitalRegistration;
