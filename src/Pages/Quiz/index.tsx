import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { Typography, Container, Button, Paper, Box, Grid } from "@mui/material";
import { getList } from "../../custom-graphql/queries";
import Loader from "../../Components/Loader";
import { GetListQuery } from "../../custom-graphql/API";
import { Card } from "../../types/amplify-types";

function Quiz() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Array<Card | null> | undefined>(undefined);
  const [listName, setListName] = useState<string | null | undefined>(undefined);
  const [quiz, setQuiz] = useState<Array<number>[] | undefined>(undefined);
  const [cardIndex, setCardIndex] = useState(0);

  const getListData = useCallback(async () => {
    try {
      const res = await API.graphql<GraphQLQuery<GetListQuery>>({
        query: getList,
        variables: { id },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      const list = res?.data?.getList?.cards?.items;
      if (list) {
        const shuffledList = shuffleArray<Card>(list as Card[]);
        setList(shuffledList);
        setListName(res?.data?.getList?.name);
        generateQuiz(shuffledList);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const shuffleArray = <T,>(arr: Array<T>) => {
    const newArr = arr.map((x) => x);
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
    }
    return newArr;
  };

  const generateQuiz = (shuffledList: Array<Card>) => {
    const quiz = shuffledList.map((_, index) => {
      const set = new Set<number>();
      set.add(index);
      while (set.size < 4) {
        set.add(Math.floor(Math.random() * shuffledList.length));
      }
      return shuffleArray<number>(Array.from(set));
    });
    setQuiz(quiz);
    setLoading(false);
  };

  useEffect(() => {
    getListData();
  }, []);

  const checkAnswer = (answer: number | undefined) => {
    if (answer !== undefined) {
      if (list?.[answer]?.front === list?.[cardIndex]?.front) {
        setCardIndex(cardIndex + 1);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      {loading && (
        <Box mt={4}>
          <Loader />
        </Box>
      )}
      {!loading && (
        <>
          <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
            {listName} Quiz
          </Typography>
          {list && list.length > 0 && (
            <Box>
              <Paper sx={{ padding: 2, height: "auto", display: "flex" }}>
                <Box sx={{ flexGrow: 1, textTransform: "lowercase" }}>
                  <Typography variant="h4" component="p" gutterBottom align="center">
                    {list?.[cardIndex]?.back}
                  </Typography>
                </Box>
              </Paper>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                {cardIndex + 1}/{list.length}
              </Box>
              <Grid container spacing={2} mt={2}>
                {quiz &&
                  quiz[cardIndex].map((x, index) => (
                    <Grid key={x} item xs={12} md={6}>
                      <Button
                        onClick={() => checkAnswer(quiz?.[cardIndex]?.[index])}
                        sx={{ width: "100%" }}
                        variant="contained">
                        {quiz?.[cardIndex]?.[index] !== undefined &&
                          quiz?.[cardIndex]?.[index] !== null && (
                            <>{list[quiz?.[cardIndex]?.[index]]?.front}</>
                          )}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default Quiz;
