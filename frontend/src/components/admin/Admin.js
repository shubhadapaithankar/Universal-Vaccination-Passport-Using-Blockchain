import React from 'react';
import AdminDashboard from './AdminDashboard';
import { Container, Typography } from '@material-ui/core';
import './Admin.css';

const Admin = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" align="center">
        Admin dashboard
      </Typography>
      <AdminDashboard />
    </Container>
  );
};

export default Admin;
