import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";

const RegistrationCard = ({ registration, onAccept, onDecline }) => {
  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "15px" }}>
      <Typography variant="h6">{registration.facilityName}</Typography>
      <Typography style={{ marginBottom: "10px" }}>
        Email: {registration.email}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAccept(registration.id)}
      >
        Accept
      </Button>
    </Paper>
  );
};

export default RegistrationCard;
