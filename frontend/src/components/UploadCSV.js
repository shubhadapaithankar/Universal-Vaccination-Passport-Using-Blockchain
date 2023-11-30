import { Box, Button, Container, Paper, Snackbar } from "@material-ui/core";
import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { API_URL } from "../apiConfig";
import { jwtDecode } from "jwt-decode";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 150 },
  { field: "dateOfFirstDose", headerName: "First dose" },
  { field: "dateOfSecondDose", headerName: "Second dose" },
  { field: "typeOfVaccine", headerName: "Vaccine type", width: 150 },
  { field: "content", headerName: "Content", width: 200 },
];

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  marginBottom: "20px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const UploadCSV = ({ isAuth }) => {
  const jwt = localStorage.getItem("token");
  const jwtDecoded = jwt === null ? null : jwtDecode(jwt);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/hospitalLogin");
  }, []);

  const onDrop = useCallback((files) => {
    if (files.length > 0) {
      Papa.parse(files[0], {
        header: true,
        complete: (result) => {
          console.log(result.data);
          setRecords(result.data);
        },
      });
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "text/csv": [".csv"] }, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const [records, setRecords] = useState([]);

  const onSubmit = async () => {
    setButtonDisabled(true);

    const email = jwtDecoded === null ? "" : jwtDecoded.email;
    const isValidUser = await validUser(email);

    if (isValidUser) {
      const response = await fetch(API_URL + "/vaccination/record/" + email, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: records }),
      }).then((res) => res.json());

      setOpen(true);

      if (uploadSuccessful(response)) {
        setSuccess(true);
        navigate("/viewRecords");
      } else {
        setSuccess(false);
      }
    } else {
      setOpen(true);
      setSuccess(false);
    }

    setButtonDisabled(false);
  };

  const validUser = async (email) => {
    const response = await fetch(API_URL + "/api/user/active-status/" + email, {
      method: "GET",
    }).then((res) => res.json());

    if (response.success) {
      return response.isActive;
    } else {
      return false;
    }
  };

  const uploadSuccessful = (records) => {
    for (const record of records) {
      if (!record.success) return false;
    }

    return true;
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px auto" }}>
        <h1>Upload Vaccination Records</h1>

        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop files here</p>
        </div>

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
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          onClick={onSubmit}
          disabled={buttonDisabled}
        >
          Submit
        </Button>
      </Paper>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={success ? "success" : "error"}
        >
          {success
            ? "Vaccination records successfully uploaded"
            : "Unauthorized to upload vaccination records"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UploadCSV;
