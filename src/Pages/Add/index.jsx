// import { API, graphqlOperation } from "aws-amplify";
// import { useEffect, useState } from "react";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import FileUpload from "../../Components/FileUpload";
// import { listCards } from "../../graphql/queries";
// import { createCard, deleteCard } from "../../graphql/mutations";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function Add() {
  // const [characters, setCharacters] = useState([]);
  // const [newCharacter, setNewCharacter] = useState("");
  // const [newEnglish, setNewEnglish] = useState("");
  // const [newPinyin, setNewPinyin] = useState("");
  // const [csvCharacters, setCsvCharacters] = useState([]);
  // const [fileKey, setFileKey] = useState(Math.random(100));

  // const mutation = createCard;
  // const query = listCards;
  // const deletion = deleteCard;
  // const csvList = csvCharacters;
  // const setCsvList = setCsvCharacters;

  // useEffect(() => {
  //   const asyncFetch = async () => {
  //     try {
  //       const resultCharacters = await API.graphql(graphqlOperation(query));
  //       setCharacters(resultCharacters.data.listCharacters.items);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //   asyncFetch();
  // }, [setCharacters]);

  // const updateList = async () => {
  //   try {
  //     const result = await API.graphql(graphqlOperation(query));
  //     setCharacters(result.data.listCharacters.items);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const clearFields = () => {
  //   setNewCharacter("");
  //   setNewPinyin("");
  //   setNewEnglish("");
  // };

  // const submit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await API.graphql(
  //       graphqlOperation(mutation, {
  //         input: {
  //           simplified: newCharacter,
  //           pinyin: newPinyin,
  //           english: newEnglish
  //         }
  //       })
  //     );
  //     updateList();
  //     clearFields();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const deleteItem = async (id) => {
  //   try {
  //     await API.graphql(
  //       graphqlOperation(deletion, {
  //         input: {
  //           id
  //         }
  //       })
  //     );
  //     updateList();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const deleteCsvItem = (index) => {
  //   const newArray = [...csvList];
  //   newArray.splice(index, 1);
  //   setCsvList(newArray);
  // };

  // const bulkUpload = async () => {
  //   try {
  //     const promises = csvList.map((x) =>
  //       API.graphql(
  //         graphqlOperation(mutation, {
  //           input: {
  //             simplified: x[0],
  //             pinyin: x[1],
  //             english: x[2]
  //           }
  //         })
  //       )
  //     );
  //     await Promise.all(promises);
  //     updateList();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Typography variant="h1" gutterBottom align="center">
        Add a new list
      </Typography>
      <Button
        component={RouterLink}
        to="/add/csv"
        sx={{ my: 2, display: "block", textAlign: "center" }}>
        Generate from CSV
      </Button>
      <Button component={RouterLink} to="/" sx={{ my: 2, display: "block", textAlign: "center" }}>
        Create from scratch
      </Button>
    </Container>
  );
}

export default Add;
