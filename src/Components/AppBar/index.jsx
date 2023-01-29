import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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

const pages = [
  { label: "Lists", url: "/" },
  { label: "Add", url: "/add" }
];

const drawerWidth = 240;

function SiteAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleDrawerToggle = () => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMobileOpen((prevState) => !prevState);
  };

  const container = window.document.body;

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle()}>
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <Button component={RouterLink} to={page.url} sx={{ width: "100%" }}>
              {page.label}
            </Button>
          </ListItem>
        ))}
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
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flearn
          </Typography>
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
