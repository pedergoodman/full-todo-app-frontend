import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useCookies } from "react-cookie";
import { Box, Button } from "@mui/material";
import { store } from "../store/store";
import { logoutUser } from "../store/actions/userActions";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [cookies] = useCookies(["XSRF-TOKEN"]);

  // get User data from the server/Okta
  const getUserData = async () => {
    setLoading(true);
    try {
      // fetch user data returns response.data
      const response = await axios.get("api/v1/user", {
        withCredentials: true,
      });
      // check if response is ok
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("response is: ", response);
      console.log("fetchUserData response.data", response.data);
      const user = response.data;
      console.log("Logged in user: ", user);

      // set user data to response.data
      if (user === "") {
        setAuthenticated(false);
      } else {
        console.log("User to set is: ", user);

        setUser(user);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    // grab the port number from the window.location
    let port = window.location.port ? ":" + window.location.port : "";

    // set the port to 8080 if it's 3000
    if (port === ":3000") {
      port = ":8080";
    }
    // redirect to the Okta login page (aka an api/<privateRoute>)
    window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;
  };

  const logout = async () => {
    await store.dispatch(logoutUser());
  };

  useEffect(() => {
    getUserData();
  }, [setAuthenticated, setLoading, setUser]);

  const message = user ? <h2>Welcome, {user.name}!</h2> : <p>Please log in.</p>;

  const button = authenticated ? (
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

  if (loading) {
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
