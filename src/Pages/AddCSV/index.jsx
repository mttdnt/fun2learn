import { Fragment, useState } from "react";
import { API } from "aws-amplify";
import Container from "@mui/material/Container";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../Components/FileUpload";
import { createList, createCard } from "../../graphql/mutations";
import Loader from "../../Components/Loader";

function AddCSV() {
  const [generatedList, setGeneratedList] = useState([]);
  const [error, setError] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitList = async () => {
    if (listName.length <= 0) {
      setError(true);
    } else {
      setLoading(true);
      try {
        const list = await API.graphql({
          query: createList,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: { name: listName }
          }
        });
        const createCards = generatedList.map((item) =>
          API.graphql({
            query: createCard,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              input: {
                front: item[0],
                back: item[1],
                listId: list.data.createList.id
              }
            }
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
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Create list by CSV
      </Typography>
      {loading && <Loader />}
      {!loading && (
        <>
          <Box textAlign="center">
            <FileUpload setList={setGeneratedList} disabled={generatedList.length > 0} />
          </Box>
          {generatedList.length > 0 && (
            <Box textAlign="center">
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <TextField
                  id="list-name"
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth={false}
                  error={error}
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => submitList()}>
                  Create list
                </Button>
              </Box>
              <List sx={{ textAlign: "center" }}>
                {generatedList.map((item) => (
                  <Fragment key={`${item[0]}`}>
                    <ListItem>
                      <ListItemText sx={{ textAlign: "center" }}>
                        <Box>Front: {item[0]}</Box>
                        <Box>Back: {item[1]}</Box>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default AddCSV;
