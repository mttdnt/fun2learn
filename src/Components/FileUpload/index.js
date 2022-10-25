import { useState } from "react";
import * as Papa from "papaparse";

function FileUpload() {
  const [characterSet, setCharacterSet] = useState(undefined);

  const onCSVParseComplete = (results) => {
    setCharacterSet(results.data);
   }
  
   const onCSVParseError = (error) => {
    console.alert(error);
   }

  const onFileUpload = (e) => {
    const csv = e.target.files[0];
    Papa.parse(csv, {
      complete: onCSVParseComplete,
      error: onCSVParseError,
    });
  };

  return (
    <div className="csv-input">
      <h1>Upload your character sheet</h1>
      <label htmlFor="csv-input">Import CSV of characters you want to memorize! </label>
      <input 
        type="file"
        id="csv-input"
        name="Character list"
        accept=".csv"
        onChange={onFileUpload}
      />
    </div>
  );
}

export default FileUpload;
