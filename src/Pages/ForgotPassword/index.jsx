import { Auth } from "aws-amplify";
import { useState } from "react";
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async (event) => {
    event.preventDefault();

    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      console.log(e);
    }
  };

  const creatNewPassword = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      navigate("/sign-in");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Forgot Password
      </Typography>
      {loading && <Loader />}
      {!loading && (
        <>
          <Box
            component="form"
            onSubmit={(e) => forgotPassword(e)}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", mb: 4 }}>
            <TextField
              sx={{ display: "block", mb: 1 }}
              required
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ display: "block", margin: "0 auto" }}
              disabled={!email}
              type="submit">
              Request new password
            </Button>
          </Box>
          <Box
            component="form"
            onSubmit={(e) => creatNewPassword(e)}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <TextField
              sx={{ display: "block", mb: 1 }}
              required
              placeholder="new password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              sx={{ display: "block", mb: 1 }}
              required
              placeholder="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ display: "block", margin: "0 auto" }}
              disabled={!email || !newPassword || !code}
              type="submit">
              Set new password
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default ForgotPassword;
