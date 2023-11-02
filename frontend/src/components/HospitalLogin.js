import { Button, Container, Paper, TextField } from "@material-ui/core";
import React from "react";

const HospitalLogin = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
        <h1>Hospital Login</h1>
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
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default HospitalLogin;
