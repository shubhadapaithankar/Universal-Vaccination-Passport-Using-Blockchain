import React, { useState, useEffect } from 'react';
import RegistrationCard from './RegistrationCard';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';


const AdminDashboard = ({ onSignOut }) => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getAllUsers');
        const userData = response.data.users;
        setRegistrations(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

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
      <br/>
      <Typography variant="h5" align="center" style={{color: 'black'}}>
        Registration requests
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
