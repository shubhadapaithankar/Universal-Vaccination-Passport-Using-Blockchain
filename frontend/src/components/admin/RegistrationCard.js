import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';

const RegistrationCard = ({ registration, onAccept, onDecline }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '15px' }}>
      <Typography variant="h6">{registration.facilityName}</Typography>
      <Typography>Email: {registration.email}</Typography>
      <Button variant="contained" color="primary" onClick={() => onAccept(registration.id)}>
        Accept
      </Button>
      &nbsp; &nbsp;
      <Button variant="contained" color="secondary" onClick={() => onDecline(registration.id)}>
        Decline
      </Button>
    </Paper>
  );
};

export default RegistrationCard;
