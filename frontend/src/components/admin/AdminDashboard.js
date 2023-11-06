import React, { useState } from 'react';
import RegistrationCard from './RegistrationCard';
import { Container, Button, Typography } from '@material-ui/core';

const dummyData = [
  { id: 1, email: 'example1@example.com', password: 'password1', facilityName: 'Hospital A' },
  { id: 2, email: 'example2@example.com', password: 'password2', facilityName: 'Hospital B' },
  // Add more dummy data as needed
];

const AdminDashboard = ({ onSignOut }) => {
  const [registrations, setRegistrations] = useState(dummyData);

  const handleAccept = (id) => {
    setRegistrations(registrations.filter((registration) => registration.id !== id));
    window.location.reload();
  };

  const handleDecline = (id) => {
    setRegistrations(registrations.filter((registration) => registration.id !== id));
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Button variant="contained" color="primary" onClick={onSignOut} >
        Sign Out
      </Button>
      <br/> <br/>
      <Typography variant="h5" align="center" style={{color: 'black'}}>
        Registration Requests
      </Typography>
      {registrations.map((registration) => (
        <RegistrationCard
          key={registration.id}
          registration={registration}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ))}
    </Container>
  );
};

export default AdminDashboard;
