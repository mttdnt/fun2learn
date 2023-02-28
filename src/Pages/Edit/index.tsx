import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { Typography, Container, Button, Box, List, ListItem, Modal, Divider } from "@mui/material";
import { GetListQuery } from "../../custom-graphql/API";
import { getList } from "../../custom-graphql/queries";
import { deleteList, deleteCard } from "../../graphql/mutations";
import Loader from "../../Components/Loader";
import ListCard from "../../Components/ListCard";
import { Card } from "../../types/amplify-types";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Array<Card | null> | undefined>(undefined);
  const [listName, setListName] = useState<string | null | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const onListDelete = async () => {
    try {
      handleClose();
      setLoading(true);
      if (list && list.length > 0) {
        const promises = list.map((item) =>
          API.graphql({
            query: deleteCard,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: { input: { id: item?.id } }
          })
        );
        await Promise.all(promises);
      }
      await API.graphql({
        query: deleteList,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { id } }
      });
      navigate(`/`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom align="center" mt={4}>
        {listName}
      </Typography>
      {loading && <Loader />}
      {!loading && (
        <Box>
          <Box textAlign="center">
            <Button
              sx={{
                width: { xs: "100%", md: "250px" },
                height: "50px",
                mr: { md: 2 },
                mb: { xs: 2, md: 0 }
              }}
              component={RouterLink}
              to={`/list/${id}`}
              variant="outlined">
              View
            </Button>
            <Button
              sx={{ width: { xs: "100%", md: "250px" }, height: "50px", ml: { md: 2 } }}
              variant="contained"
              color="error"
              onClick={handleOpen}>
              Delete
            </Button>
          </Box>
          <List>
            {list &&
              list.map((item) => (
                <ListItem key={item?.id}>
                  <ListCard
                    card={item}
                    onUpdate={() => setLoading(true)}
                    onFinishUpdate={getListData}
                  />
                </ListItem>
              ))}
          </List>
          <Divider variant="middle" sx={{ mt: 4, mb: 2 }} />
          <Box mb={4}>
            <Typography variant="h6" component="p" gutterBottom align="center">
              New Item
            </Typography>
            <ListCard onUpdate={() => setLoading(true)} onFinishUpdate={getListData} listId={id} />
          </Box>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4
          }}
          textAlign="center">
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This will permanently delete your list!
          </Typography>
          <Button
            onClick={handleClose}
            sx={{ display: "block", width: "50%", margin: "0 auto", mt: 1 }}
            variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={onListDelete}
            sx={{ display: "block", width: "50%", margin: "0 auto", mt: 1 }}
            variant="contained"
            color="error">
            Delete
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default Edit;
