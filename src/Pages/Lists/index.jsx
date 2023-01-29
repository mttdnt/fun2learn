import { Link as RouterLink } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { Button, Typography, Box, Container, Grid } from "@mui/material";
import { listLists } from "../../graphql/queries";
// import { deleteList } from "../../graphql/mutations";
import Loader from "../../Components/Loader";

function Lists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLists = useCallback(async () => {
    try {
      const res = await API.graphql(graphqlOperation(listLists));
      setLists(res.data.listLists.items);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getLists();
  }, [setLists]);

  // const onListDelete = async (id) => {
  //   try {
  //     setLoading(true);
  //     await API.graphql(
  //       graphqlOperation(deleteList, {
  //         input: {
  //           id
  //         }
  //       })
  //     );
  //     getLists();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const buildLists = () => {
    return lists.map((item) => (
      <Grid key={item.id} item xs={12} md={6}>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/list/${item.id}`}
          sx={{ width: "100%" }}>
          {item.name}
        </Button>
      </Grid>
    ));
  };

  // <Button onClick={() => onListDelete(item.id)}>Delete</Button>

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
      <Typography variant="h1" gutterBottom align="center">
        Your Lists
      </Typography>
      {loading && <Loader />}
      {!loading && listSection()}
    </Container>
  );
}

export default Lists;
