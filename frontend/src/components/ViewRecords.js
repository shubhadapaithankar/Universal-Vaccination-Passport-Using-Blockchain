import { Box, Container, Paper } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../apiConfig";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 150 },
  { field: "dateOfFirstDose", headerName: "First dose" },
  { field: "dateOfSecondDose", headerName: "Second dose" },
  { field: "typeOfVaccine", headerName: "Vaccine type", width: 150 },
  { field: "content", headerName: "Content", width: 200 },
];

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const jwt = localStorage.getItem("token");
  const jwtDecoded = jwt === null ? null : jwtDecode(jwt);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    if (jwtDecoded !== null) {
      const response = await fetch(
        API_URL + "/vaccination-records/" + jwtDecoded.email,
        {
          method: "GET",
        }
      ).then((res) => res.json());

      console.log(response.records);
      setRecords(response.records);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
        <h1>Your Uploaded Vaccination Records</h1>
        <Box>
          <DataGrid
            rows={records}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            slots={{
              noRowsOverlay: () => {
                return <div></div>;
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewRecords;
