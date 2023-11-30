import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button, Box, Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import QRCode from "qrcode.react";
import { API_URL } from "../apiConfig";

// const apiUrl = "http://localhost:3000/vaccination/record/";
// Change this to ngrok url
// const apiUrl = "https://d03a-2607-f380-828-fb00-00-8db9.ngrok.io/vaccination/record/"
//
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Vaccination() {
  const paperStyle = { padding: "20px", margin: "20px auto" };
  const [unique_id, setUniqueId] = useState("");
  const [vaccinationRecord, setVaccinationRecord] = useState([]);
  const classes = useStyles();
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setFetchSuccess(false);
    setErrorMessage("");

    fetch(`${API_URL}/vaccination/record/${unique_id}`)
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          throw new Error("Failed to fetch vaccination record.");
        }
        return res.json();
      })
      .then((result) => {
        console.log("Vaccination Record is set");
        setVaccinationRecord(result);
        setFetchSuccess(true);
      })
      .catch((error) => {
        setErrorMessage(error.message || "An error occurred");
      });
  };

  const useStyles2 = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes2 = useStyles2();

  useEffect(() => {
    // fetch("http://localhost:8080/student/getAll")
    //   .then(res => res.json())
    //   .then((result) => {
    //     setStudents(result);
    //   }
    //   )
  }, []);
  return (
    <Container style={{ justifyContent: "center", display: "flex" }}>
      <Grid xs={12} sm={8} md={6}>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "blue" }}>Enter your unique Government ID</h1>

          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Unique Government ID"
              variant="outlined"
              fullWidth
              value={unique_id}
              onChange={(e) => setUniqueId(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Submit
            </Button>
          </form>
        </Paper>
        {fetchSuccess ? (
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{ color: "black" }}>YOUR VACCINATION PASSPORT</h1>
          
            <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={vaccinationRecord.id}
          >
            {/* Id: {vaccinationRecord.id}<br />
            Name: {vaccinationRecord.name}<br />
            dateOfFirstDose: {vaccinationRecord.dateOfFirstDose} <br />
            dateOfSecondDose:  {vaccinationRecord.dateOfSecondDose} <br />
            typeOfVaccine: {vaccinationRecord.typeOfVaccine} <br />
            content:  {vaccinationRecord.content} <br /> */}

            <br></br>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <QRCode
                id="qr-gen"
                value={`${window.location.origin}/vaccinationCard/${unique_id}`}
                size={250}
                level={"H"}
                includeMargin={true}
              />
            </Box>
            <br></br>

            <TableContainer component={Paper}>
              <Table className={classes2.table} aria-label="simple table">
                <TableBody>
                  {/* <TableRow>
                    <TableCell component="th" scope="row">
                      Government Id:
                    </TableCell>
                    <TableCell align="left">{vaccinationRecord.id}</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Name:
                    </TableCell>
                    <TableCell align="left">{vaccinationRecord.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Date of First Dose:
                    </TableCell>
                    <TableCell align="left">
                      {vaccinationRecord.dateOfFirstDose}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Date of Second Dose:
                    </TableCell>
                    <TableCell align="left">
                      {vaccinationRecord.dateOfSecondDose}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Type of Vaccine:
                    </TableCell>
                    <TableCell align="left">
                      {vaccinationRecord.typeOfVaccine}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Remarks:
                    </TableCell>
                    <TableCell align="left">
                      {vaccinationRecord.content}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Paper> 
        ) : errorMessage ? (
            <Typography color="error">{errorMessage}</Typography>
          ) : null}
      </Grid>
    </Container>
  );
}
