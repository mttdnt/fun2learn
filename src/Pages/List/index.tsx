import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { GraphQLQuery } from '@aws-amplify/api';
import { Typography, Container, Button, Paper, Box, Grid } from "@mui/material";
import { getList } from "../../custom-graphql/queries";
import Loader from "../../Components/Loader";
import { GetListQuery } from "../../custom-graphql/API";
import { Card } from "../../types/amplify-types";

function List() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Array<Card | null> | undefined>(undefined);
  const [listName, setListName] = useState<string | null | undefined>(undefined);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const getListData = useCallback(async () => {
    try {
      const res = await API.graphql<GraphQLQuery<GetListQuery>>({
        query: getList,
        variables: { id },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      setList(res?.data?.getList?.cards?.items);
      setListName(res?.data?.getList?.name);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getListData();
  }, []);

  const cardVal =
    list && list.length > 0 && (!flipped ? list[cardIndex]?.front : list[cardIndex]?.back);

  return (
    <Container maxWidth="lg">
      {loading && <Loader />}
      {!loading && (
        <>
          <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
            {listName}
            <Button component={RouterLink} to={`/edit/${id}`} variant="text">
              Edit
            </Button>
          </Typography>
          {list && list.length > 0 && (
            <Box>
              <Paper sx={{ minHeight: "300px", height: "auto", display: "flex" }}>
                <Button
                  sx={{ flexGrow: 1, textTransform: "lowercase" }}
                  onClick={() => setFlipped(!flipped)}>
                  <Typography variant="h5" component="span">
                    {cardVal}
                  </Typography>
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
        </>
      )}
    </Container>
  );
}

export default List;
