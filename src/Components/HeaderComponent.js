import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";
import HomeIcon from "@mui/icons-material/Home";

export default function HeaderComponent() {
  // tools for redux
  const dispatch = useDispatch();

  // local state for the menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // grab the user state from the store
  const { isUserAuthenticated } = useSelector((state) => state.user);

  // menu functions
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMyProjects = () => {
    handleCloseMenu();
  };

  const handleClickMyProfile = () => {
    handleCloseMenu();
  };

  // login/logout functions
  const handleLogin = () => {
    // grab the port number from the window.location
    let port = window.location.port ? ":" + window.location.port : "";

    // set the port to 8080 if it's 3000
    if (port === ":3000") {
      port = ":8080";
    }
    console.log("location is: ", window.location.hostname);

    // redirect to the Okta login page (aka an api/<privateRoute>)
    window.location.href = `//${window.location.hostname}${port}/api/privateRoute`;

    // ? this redirects back to localhost:8080, would like to get it to redirect to localhost:3000
    // window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;

    window.location.href = "http://localhost:8080/oauth2/authorization/okta";
    // setAuth(true)
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleCloseMenu();
  };

  const LoginButton = () => {
    return (
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>

          {isUserAuthenticated ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleClickMyProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClickMyProjects}>My Projects</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
