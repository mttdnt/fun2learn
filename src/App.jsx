import { Amplify } from "aws-amplify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import AppBar from "./Components/AppBar";

// Routes
import Add from "./Pages/Add";
import Lists from "./Pages/Lists";
import AddCSV from "./Pages/AddCSV";
import List from "./Pages/List";
import Edit from "./Pages/Edit";
import AddManual from "./Pages/AddManual";

import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Box component="main">
          <Routes>
            <Route path="/" element={<Lists />} />
            <Route path="/add" element={<Add />} />
            <Route path="/add/csv" element={<AddCSV />} />
            <Route path="/list/:id" element={<List />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="add/manual" element={<AddManual />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
