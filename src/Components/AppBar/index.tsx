import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { Container } from "@mui/material";

interface ISiteAppBarProps {
  setUser: React.Dispatch<any>;
}

const pages = [
  { label: "Lists", url: "/" },
  { label: "Add", url: "/add" }
];

const drawerWidth = 240;

function SiteAppBar({ setUser }: ISiteAppBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleDrawerToggle = () => () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerToggleKeyboard = () => (event: any) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setMobileOpen((prevState) => !prevState);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(undefined);
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  const container = window.document.body;

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle()}
      onKeyUp={handleDrawerToggleKeyboard()}>
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <Button component={RouterLink} to={page.url} sx={{ width: "100%" }}>
              {page.label}
            </Button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button onClick={signOut} sx={{ width: "100%" }}>
            Sign out
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle()}
            onKeyUp={handleDrawerToggleKeyboard()}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              component={RouterLink}
              to={"/"}
              sx={{ my: 2, color: "white", textAlign: "left" }}>
              <Typography variant="h6" component="div">
                Qwizrd
              </Typography>
            </Button>
          </Box>
          <Box component="nav" sx={{ display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.url}
                sx={{ my: 2, color: "white", display: "block", textAlign: "center" }}>
                {page.label}
              </Button>
            ))}
            <Button
              sx={{ my: 2, color: "white", display: "block", textAlign: "center" }}
              onClick={signOut}>
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ display: { xs: "block", sm: "none" } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle()}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}>
          {list()}
        </Drawer>
      </Box>
    </Container>
  );
}

export default SiteAppBar;
