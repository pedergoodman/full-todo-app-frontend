import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useCookies } from "react-cookie";
import { Box, Button } from "@mui/material";
import { store } from "../store/store";
import { authenticateUser, logoutUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { loadingAuth, isUserAuthenticated, userDetails } = useSelector(
    (state) => state.user
  );
  const {firstName, lastName, email } = userDetails;

  const dispatch = useDispatch();

  const login = () => {
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
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  const message = userDetails ? <h2>Welcome, {userDetails.firstName}!</h2> : <p>Please log in.</p>;

  const button = isUserAuthenticated ? (
    <div>
      <Button color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  ) : (
    <Button color="primary" onClick={login}>
      Login
    </Button>
  );

  if (loadingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        {message}
        {button}
      </Box>
    </div>
  );
};

export default Home;
