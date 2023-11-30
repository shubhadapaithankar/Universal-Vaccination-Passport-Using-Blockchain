import React, { useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { Container, Typography } from "@material-ui/core";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = ({ isAdmin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) navigate("/hospitalLogin");
  }, []);

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
