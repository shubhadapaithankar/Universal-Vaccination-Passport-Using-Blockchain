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
import ChatIcon from "@mui/icons-material/Chat";
import Login from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { API_URL } from "../apiConfig";
import ViewListIcon from "@mui/icons-material/ViewList";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

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

export default function Appbar({ isAuth, setIsAuth, setIsAdmin, isAdmin }) {
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

  const goToViewRecordsPage = () => {
    navigate("/viewRecords");
    setMenuOpen(false);
  };

  const goToAdminDashboard = () => {
    navigate("/admin");
    setMenuOpen(false);
  };

  const goToChatPage = () => {
    navigate("/Chat");
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const response = await fetch(API_URL + "/api/user/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());

    if (response.success) {
      navigate("/");
      localStorage.removeItem("token");
      setIsAuth(false);
      setIsAdmin(false);
      setMenuOpen(false);
    }
  };

  const { pathname } = useLocation();

  if (pathname.includes("/vaccinationCard")) return null;

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
                {isAuth && !isAdmin && (
                  <ListItem onClick={goToUploadRecordsPage}>
                    <ListItemButton>
                      <ListItemIcon>
                        <UploadFileIcon />
                      </ListItemIcon>
                      <ListItemText primary="Upload Records" />
                    </ListItemButton>
                  </ListItem>
                )}
                {isAuth && !isAdmin && (
                  <ListItem onClick={goToViewRecordsPage}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ViewListIcon />
                      </ListItemIcon>
                      <ListItemText primary="View Your Uploaded Records" />
                    </ListItemButton>
                  </ListItem>
                )}
                {isAdmin && (
                  <ListItem onClick={goToAdminDashboard}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Admin Dashboard" />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem onClick={goToChatPage}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chat with Assistant" />
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
