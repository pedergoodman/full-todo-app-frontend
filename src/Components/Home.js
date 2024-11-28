import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useCookies } from "react-cookie";
import { Box, Button } from "@mui/material";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Default to true since we're fetching data
  const [user, setUser] = useState(undefined);
  const [cookies] = useCookies(["XSRF-TOKEN"]);

  // Fetch user data from the server
  const getUserData = async () => {
    setLoading(true);
    try {
      console.log("Fetching user data...");
      const response = await axios.get("/api/v1/user", { withCredentials: true });

      if (response.status === 200 && response.data) {
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
        setAuthenticated(true);
      } else {
        console.warn("No user data found.");
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.response || error.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };


  // Handle login redirection
  const login = () => {
    const port = window.location.port === "3000" ? ":8080" : window.location.port;
    console.log(`Redirecting to login on port: ${port}`);
    window.location.href = `http://${window.location.hostname}${port}/oauth2/authorization/okta`;
  };  

  // Handle logout
  const logout = async () => {
    try {
      console.log("Logging out...");
      const csrfToken = cookies["XSRF-TOKEN"];
      if (!csrfToken) {
        console.error("CSRF token missing in cookies! Checking via session...");
        const csrfMeta = document.querySelector('meta[name="_csrf"]');
        if (csrfMeta) {
          csrfToken = csrfMeta.getAttribute("content");
        }
      }
      if (!csrfToken) {
        console.error("CSRF token still missing! Cannot proceed with logout.");
        return;
      }



      const response = await axios.post("/api/logout", null, {
        headers: { "X-XSRF-TOKEN": csrfToken },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Logout successful. Redirecting to login...");
        setAuthenticated(false);
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during logout:", error.response || error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        {authenticated ? (
          <>
            <h2>Welcome, {user?.name || "User"}!</h2>
            <p>Email: {user?.email}</p>
            <Button variant="contained" color="primary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <h2>Please log in to access your account.</h2>
            <Button variant="contained" color="primary" onClick={login}>
              Login
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
