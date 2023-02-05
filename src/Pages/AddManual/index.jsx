import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Paper,
  Grid,
  TextField,
  Button,
  ListItemText
} from "@mui/material";
import Loader from "../../Components/Loader";
import { createList, createCard } from "../../graphql/mutations";

function AddManual() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const addCardToList = () => {
    const newList = list.map((item) => ({ front: item.front, back: item.back }));
    newList.push({ front, back });
    setList(newList);
    setFront("");
    setBack("");
  };

  const onSaveList = async () => {
    if (listName.length <= 0) {
      setError(true);
    } else {
      setLoading(true);
      try {
        const resList = await API.graphql({
          query: createList,
          variables: { input: { name: listName } },
          authMode: "AMAZON_COGNITO_USER_POOLS"
        });
        const createCards = list.map((item) =>
          API.graphql({
            query: createCard,
            variables: {
              input: { front: item.front, back: item.back, listId: resList.data.createList.id }
            },
            authMode: "AMAZON_COGNITO_USER_POOLS"
          })
        );
        await Promise.all(createCards);
        navigate("/");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Create a list
      </Typography>
      {loading && <Loader />}
      {!loading && (
        <Box>
          <Button
            sx={{ width: "100%", display: "block", my: 2 }}
            onClick={onSaveList}
            variant="contained">
            Save
          </Button>
          <TextField
            sx={{ width: "100%" }}
            id="list-name"
            label="Name"
            variant="outlined"
            required
            fullWidth={false}
            error={error}
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <List>
            {list.map((item) => (
              <ListItem sx={{ display: "block" }} key={item.front}>
                <Paper sx={{ width: "100%", position: "relative" }}>
                  <Grid container>
                    <Grid item xs={12} md={6} padding={2}>
                      <ListItemText>{item.front}</ListItemText>
                    </Grid>
                    <Grid item xs={12} md={6} padding={2}>
                      <ListItemText>{item.front}</ListItemText>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    color="error"
                    aria-label="delete">
                    X
                  </Button>
                </Paper>
              </ListItem>
            ))}
          </List>
          <Paper sx={{ width: "100%" }}>
            <Grid container>
              <Grid item xs={12} md={6} padding={2}>
                <TextField
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Front"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={6} padding={2}>
                <TextField
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="Back"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
            </Grid>
            <Button
              sx={{ width: "100%", display: "block" }}
              disabled={front === "" || back === ""}
              onClick={addCardToList}
              variant="contained">
              Add
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default AddManual;
