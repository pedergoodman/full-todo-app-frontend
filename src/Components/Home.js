import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { authenticateUser, logoutUser } from "../store/actions/userActions";

const Home = () => {
  const { loadingAuth, isUserAuthenticated, userDetails } = useSelector(
    (state) => state.user
  );
  const { firstName, lastName, email } = userDetails;

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

  const message = isUserAuthenticated ? (
    <h2>Welcome, {userDetails.firstName}!</h2>
  ) : (
    <p>Please log in.</p>
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
      </Box>
    </div>
  );
};

export default Home;
