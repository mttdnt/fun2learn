import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Typography, Container, Button, TextField, Box } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Loader from "../../Components/Loader";

interface ISignInProps {
  getUser: () => Promise<void>;
  user: any;
};

function SignIn({ getUser, user }: ISignInProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tempUser, setTempUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const createNew = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tempUser && newPassword) {
      try {
        setLoading(true);
        await Auth.completeNewPassword(tempUser, newPassword);
        setLoading(false);
        getUser();
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const userRes = await Auth.signIn(email, password);
      if (userRes.challengeName === "NEW_PASSWORD_REQUIRED") {
        setTempUser(userRes);
        setLoading(false);
      } else {
        setLoading(false);
        getUser();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const newPasswordComp = () => (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Typography
        sx={{ display: "block", justifyContent: "center" }}
        variant="h6"
        component="p"
        gutterBottom
        align="center"
        mt={4}>
        Email: {email}
      </Typography>
      <form onSubmit={(e) => createNew(e)}>
        <TextField
          sx={{ display: "block", mb: 1 }}
          required
          placeholder="new password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ display: "block", margin: "0 auto" }}
          disabled={!email || !password}
          type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );

  const signInComp = () => (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <form onSubmit={(e) => signIn(e)}>
        <TextField
          sx={{ display: "block", mb: 1 }}
          required
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          required
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ display: "block", margin: "0 auto", mb: 2 }}
          disabled={!email || !password}
          type="submit">
          Sign in
        </Button>
      </form>
      <Button component={RouterLink} to="/forgot-password" sx={{ display: "block" }}>
        Forgot Password
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Sign In
      </Typography>
      {loading && <Loader />}
      {!loading && !tempUser && signInComp()}
      {!loading && tempUser && newPasswordComp()}
    </Container>
  );
}

export default SignIn;
