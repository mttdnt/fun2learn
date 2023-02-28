import { useState } from "react";
import { API } from "aws-amplify";
import { Button, Box, Grid, Paper, TextField } from "@mui/material";
import { deleteCard, updateCard, createCard } from "../../graphql/mutations";
import { Card } from "../../types/amplify-types";

interface IListCardProps {
  card?: Card | null;
  onUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  onFinishUpdate: () => Promise<void>;
  listId?: string;
};

function ListCard({ card, onUpdate, onFinishUpdate, listId }: IListCardProps) {
  const [front, setFront] = useState(card ? card.front : "");
  const [back, setBack] = useState(card ? card.back : "");

  const disabled = () => {
    if (card) {
      return card.front === front && card.back === back;
    }

    return (front === "" && back === "") || !listId;
  };

  const saveMutation = card ? updateCard : createCard;

  const onSave = async () => {
    try {
      onUpdate(true);
      await API.graphql({
        query: saveMutation,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            ...(card ? { id: card.id } : {}),
            front,
            back,
            listId
          }
        }
      });
      onFinishUpdate();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const onDelete = async () => {
    try {
      onUpdate(true);
      await API.graphql({
        query: deleteCard,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: card?.id
          }
        }
      });
      onFinishUpdate();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <Paper sx={{ width: "100%", height: "200px" }}>
      <Grid container sx={{ height: "175px" }}>
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
      <Box>
        <Button
          disabled={disabled()}
          sx={{ height: "25px", width: card ? "50%" : "100%" }}
          variant="contained"
          color="primary"
          onClick={() => onSave()}>
          Save
        </Button>
        {card && (
          <Button
            sx={{ height: "25px", width: "50%" }}
            variant="contained"
            color="error"
            onClick={() => onDelete()}>
            Delete
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default ListCard;
