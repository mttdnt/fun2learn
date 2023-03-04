import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function Add() {
  return (
    <Container maxWidth="lg" sx={{ height: "100%", mb: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Add a new list
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="/add/csv"
        sx={{
          display: "block",
          textAlign: "center",
          width: "100%",
          maxWidth: "250px",
          margin: "0 auto",
          mt: 2
        }}>
        Generate from CSV
      </Button>
      <Button
        variant="contained"
        component={RouterLink}
        to="/add/manual"
        sx={{
          display: "block",
          textAlign: "center",
          width: "100%",
          maxWidth: "250px",
          margin: "0 auto",
          mt: 2
        }}>
        Create from scratch
      </Button>
    </Container>
  );
}

export default Add;
