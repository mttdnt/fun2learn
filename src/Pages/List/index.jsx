import { useCallback, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from "react-router-dom";
import { Typography, Container, Button, Paper, Box, Grid } from "@mui/material";
import { getList } from "../../graphql/queries";
import Loader from "../../Components/Loader";

function List() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(undefined);
  const [listName, setListName] = useState(undefined);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const getListData = useCallback(async () => {
    try {
      const res = await API.graphql(
        graphqlOperation(getList, {
          id
        })
      );
      setList(res.data.getList.cards.items);
      setListName(res.data.getList.name);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getListData();
  }, []);

  const cardVal = list && (!flipped ? list[cardIndex].front : list[cardIndex].back);

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom align="center">
        {listName}
      </Typography>
      {loading && <Loader />}
      {!loading && list.length > 0 && (
        <Box>
          <Paper sx={{ height: "300px", display: "flex" }}>
            <Button sx={{ flexGrow: 1 }} onClick={() => setFlipped(!flipped)}>
              {cardVal}
            </Button>
          </Paper>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4}>
              <Button
                onClick={() => setCardIndex(cardIndex - 1)}
                disabled={cardIndex === 0}
                sx={{ width: "100%" }}
                variant="contained">
                Previous
              </Button>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              {cardIndex + 1}/{list.length}
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                onClick={() => setCardIndex(cardIndex + 1)}
                disabled={cardIndex === list.length - 1}
                sx={{ width: "100%" }}
                variant="contained">
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default List;
