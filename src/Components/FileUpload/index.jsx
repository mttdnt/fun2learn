import { useRef } from "react";
import * as Papa from "papaparse";
import Button from "@mui/material/Button";

function FileUpload({ setList, fileKey, disabled }) {
  const onCSVParseComplete = (results) => {
    setList(results.data);
  };

  const onCSVParseError = (error) => {
    console.error(error);
  };

  const onFileUpload = (e) => {
    const csv = e.target.files[0];
    Papa.parse(csv, {
      complete: onCSVParseComplete,
      error: onCSVParseError
    });
  };

  const fileInput = useRef();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fileInput.current.click()}
        disabled={disabled}>
        upload file
      </Button>

      <input
        ref={fileInput}
        type="file"
        name="Character list"
        accept=".csv"
        onChange={onFileUpload}
        key={fileKey}
        style={{ display: "none" }}
      />
    </>
  );
}

export default FileUpload;
