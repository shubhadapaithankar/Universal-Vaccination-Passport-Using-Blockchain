import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import QRCode from "qrcode.react";

const apiUrl = "http://localhost:3000/vaccination/record/"
// Change this to ngrok url
// const apiUrl = "https://d03a-2607-f380-828-fb00-00-8db9.ngrok.io/vaccination/record/"
//
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function Vaccination() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [unique_id, setUniqueId] = useState('')
  const [vaccinationRecord, setVaccinationRecord] = useState([])
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault()
    console.log(unique_id)
    fetch(apiUrl + unique_id)
      .then((res) => res.json())
      .then((result) => {
        console.log("Vaccination Record is set")
        setVaccinationRecord(result)
      })


  }

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
  }, [])
  return (

    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>Enter your unique Government ID</h1>

        <form className={classes.root} noValidate autoComplete="off">

          <TextField id="outlined-basic" label="Unique Government ID" variant="outlined" fullWidth
            value={unique_id}
            onChange={(e) => setUniqueId(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>

      </Paper>

      <Paper elevation={3} style={paperStyle}>

      <h1 style={{ color: "black" }}>YOUR VACCINATION PASSPORT</h1>
        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={vaccinationRecord.id}>
            {/* Id: {vaccinationRecord.id}<br />
            Name: {vaccinationRecord.name}<br />
            dateOfFirstDose: {vaccinationRecord.dateOfFirstDose} <br />
            dateOfSecondDose:  {vaccinationRecord.dateOfSecondDose} <br />
            typeOfVaccine: {vaccinationRecord.typeOfVaccine} <br />
            content:  {vaccinationRecord.content} <br /> */}

        <br></br>
        <QRCode
        id="qr-gen"
        value= {apiUrl + unique_id}
        size={290}
        level={"H"}
        includeMargin={true}
      />
        <br></br>

          <TableContainer component={Paper}>
      <Table className={classes2.table} aria-label="simple table">

        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Government Id:
              </TableCell>
              <TableCell align="left" >{vaccinationRecord.id}</TableCell>
            </TableRow>
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
              <TableCell align="left">{vaccinationRecord.dateOfFirstDose}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Date of Second Dose:
              </TableCell>
              <TableCell align="left">{vaccinationRecord.dateOfSecondDose}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Type of Vaccine:
              </TableCell>
              <TableCell align="left">{vaccinationRecord.typeOfVaccine}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
              Remarks:
              </TableCell>
              <TableCell align="left">{vaccinationRecord.content}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Paper>
  



      </Paper>



    </Container>
  );
}
