import * as Papa from "papaparse";

function FileUpload({ setArray, fileKey }) {
  const onCSVParseComplete = (results) => {
    setArray(results.data);
   }
  
   const onCSVParseError = (error) => {
    console.error(error);
   }

  const onFileUpload = (e) => {
    const csv = e.target.files[0];
    Papa.parse(csv, {
      complete: onCSVParseComplete,
      error: onCSVParseError,
    });
  }; 

  return (
    <div>
      <label htmlFor="csv-input">Upload CSV </label>
      <input 
        type="file"
        id="csv-input"
        name="Character list"
        accept=".csv"
        onChange={onFileUpload}
        key={fileKey}
      />
    </div>
  );
}

export default FileUpload;
