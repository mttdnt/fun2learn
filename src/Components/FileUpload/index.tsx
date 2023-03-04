import { useRef } from "react";
import * as Papa from "papaparse";
import Button from "@mui/material/Button";

interface IFileUploadProps {
  setList: React.Dispatch<any>;
  disabled: boolean;
}

function FileUpload({ setList, disabled }: IFileUploadProps) {
  const onCSVParseComplete = (results: any) => {
    setList(results.data);
  };

  const onCSVParseError = (error: any) => {
    console.error(error);
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const csv = e.target.files[0];
      Papa.parse(csv, {
        complete: onCSVParseComplete,
        error: onCSVParseError
      });
    }
  };

  const fileInput = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fileInput.current?.click()}
        disabled={disabled}>
        upload file
      </Button>

      <input
        ref={fileInput}
        type="file"
        name="Character list"
        accept=".csv"
        onChange={onFileUpload}
        style={{ display: "none" }}
      />
    </>
  );
}

export default FileUpload;
