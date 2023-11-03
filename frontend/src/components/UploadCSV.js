import { Box, Button, Container, Paper } from "@material-ui/core";
import React, { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 150 },
  { field: "dateOfFirstDose", headerName: "First dose" },
  { field: "dateOfSecondDose", headerName: "Second dose" },
  { field: "dateOfBooster", headerName: "Booster" },
  { field: "typeOfVaccine", headerName: "Vaccine type", width: 150 },
  { field: "comments", headerName: "Comments", width: 200 },
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

const UploadCSV = () => {
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
        >
          Submit
        </Button>
      </Paper>
    </Container>
  );
};

export default UploadCSV;
