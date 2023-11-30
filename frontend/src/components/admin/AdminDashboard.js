import React, { useState, useEffect } from "react";
import RegistrationCard from "./RegistrationCard";
import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../../apiConfig";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "/api/user/getAllUsers");
      const userData = response.data.users;
      setRegistrations(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAccept = async (id, userEmail) => {
    try {
      await axios.put(API_URL + `/api/user/toggle-active/${userEmail}`);

      fetchData();
    } catch (error) {
      console.error("Error toggling user active status:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography
        variant="h5"
        align="center"
        style={{ color: "black", marginBottom: "10px" }}
      >
        Registration requests
      </Typography>
      {registrations.map((registration) => (
        <RegistrationCard
          key={registration.id}
          registration={registration}
          onAccept={() => handleAccept(registration.id, registration.email)}
        />
      ))}
    </Container>
  );
};

export default AdminDashboard;
