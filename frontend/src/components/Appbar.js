import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Login from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar({ isAuth, setIsAuth }) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/hospitalLogin");
    setMenuOpen(false);
  };

  const goToPassportPage = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const goToUploadRecordsPage = () => {
    navigate("/uploadCSV");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setIsAuth(false);
    setMenuOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={menuOpen}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
          >
            <Box>
              <List>
                <ListItem onClick={goToPassportPage}>
                  <ListItemButton>
                    <ListItemIcon>
                      <VaccinesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vaccination Passport" />
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={goToUploadRecordsPage}>
                  <ListItemButton>
                    <ListItemIcon>
                      <UploadFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upload Records" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <List>
                {isAuth ? (
                  <ListItem onClick={handleLogout}>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem onClick={goToLoginPage}>
                    <ListItemButton>
                      <ListItemIcon>
                        <Login />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Box>
          </Drawer>
          <Box className="navBarTitle">
            <Typography className={classes.title}>
              UNIVERSAL VACCINE PASSPORT PORTAL (POWERED BY ETHEREUM BLOCKCHAIN
              NETWORK)
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
