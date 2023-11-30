import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import QRCode from "qrcode.react";
import CheckIcon from "@mui/icons-material/Check";
import { API_URL } from "../apiConfig";
import { Container, Divider } from "@material-ui/core";

const VaccinationCard = () => {
  const { uniqueId } = useParams();

  console.log(uniqueId);
  // const uniqueId = "9999"
  const [vaccinationRecord, setVaccinationRecord] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/vaccination/record/${uniqueId}`)
      .then((res) => res.json())
      .then((result) => {
        setVaccinationRecord(result);
      });
  }, [uniqueId]);

  if (!vaccinationRecord) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          minWidth: 325,
          background: red[500],
          color: "#fff",
          borderRadius: 2,
          marginTop: "20px",
        }}
      >
        <CardContent sx={{ padding: "16px 0px !important" }}>
          <Typography sx={{ fontSize: 14, marginBottom: "10px" }} gutterBottom>
            Vaccination Card - COVID-19
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#fff !important",
            }}
          />
          <Typography variant="h5" component="h2" sx={{ marginTop: "20px" }}>
            {vaccinationRecord.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            Vaccine: {vaccinationRecord.typeOfVaccine}
          </Typography>
          <Typography variant="body2">
            First Dose: {vaccinationRecord.dateOfFirstDose} <br />
            Second Dose: {vaccinationRecord.dateOfSecondDose} <br />
            {/* Issued by: {vaccinationRecord.typeOfVaccine} */}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <QRCode
              value={`${window.location.origin}/vaccinationCard/${uniqueId}`}
              size={175}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <CheckIcon sx={{ color: "#fff" }} />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VaccinationCard;
