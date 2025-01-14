import { useEffect, useState, useCallback } from "react";
import { Amplify, Auth } from "aws-amplify";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgotPassword";
import Quiz from "./Pages/Quiz";

import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [user, setUser] = useState<any | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = useCallback(async () => {
    try {
      const resUser = await Auth.currentAuthenticatedUser();
      setUser(resUser);
    } catch (e) {
      console.error(e);
      if (!location.pathname.includes("sign-in") && !location.pathname.includes("forgot-password"))
        navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {user && <AppBar setUser={setUser} />}
      <Box component="main">
        <Routes>
          <Route path="/sign-in" element={<SignIn getUser={getUser} user={user} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Lists />} />
          <Route path="/add" element={<Add />} />
          <Route path="/add/csv" element={<AddCSV />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="add/manual" element={<AddManual />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

function WithRouting() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WithRouting;
