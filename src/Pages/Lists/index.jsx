import { Link as RouterLink } from "react-router-dom";
import { API } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { listLists } from "../../graphql/queries";
import Loader from "../../Components/Loader";

function Lists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLists = useCallback(async () => {
    try {
      const res = await API.graphql({
        query: listLists,
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      setLists(res.data.listLists.items);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getLists();
  }, [setLists]);

  const buildLists = () => {
    return lists.map((item) => (
      <Grid key={item.id} item xs={12} md={6}>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/list/${item.id}`}
          sx={{ width: "100%", height: "100px" }}>
          <Typography variant="body1">{item.name}</Typography>
        </Button>
      </Grid>
    ));
  };

  const listSection = () => {
    return (
      <>
        {lists.length > 0 && (
          <Grid container spacing={2}>
            {buildLists()}
          </Grid>
        )}
        {lists.length <= 0 && <Box align="center">You have no lists.</Box>}
      </>
    );
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        Your Lists
      </Typography>
      {loading && <Loader />}
      {!loading && listSection()}
    </Container>
  );
}

export default Lists;
