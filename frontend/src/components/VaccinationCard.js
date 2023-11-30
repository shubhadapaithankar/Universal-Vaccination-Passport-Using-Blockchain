import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import QRCode from 'qrcode.react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API_URL } from "../apiConfig";

const VaccinationCard = () => {
  const { uniqueId } = useParams();

  console.log(uniqueId)
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
    <Card sx={{ maxWidth: 345, background: red[500], color: '#fff', borderRadius: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
          Vaccination Card - COVID-19
        </Typography>
        <Typography variant="h5" component="h2">
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
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <QRCode value={`${window.location.origin}/vaccinationCard/${uniqueId}`} size={128} level={"H"} includeMargin={true} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <FavoriteIcon sx={{ color: '#fff' }} />
        </div>
      </CardContent>
    </Card>
  );
};

export default VaccinationCard;
