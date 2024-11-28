import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Box, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

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
        
        // Check if the CSRF token is set in the cookies
        const csrfToken = Cookies.get("XSRF-TOKEN");
        if (!csrfToken) {
          console.warn("CSRF token not found in cookies after user data fetch! Trying to fetch it manually...");
          await axios.get('/'); // Make an additional request to get the CSRF token
        }
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
    const port = window.location.port === "3000" ? ":8081" : window.location.port;
    console.log(`Redirecting to login on port: ${port}`);
    window.location.href = `http://${window.location.hostname}${port}/oauth2/authorization/okta`;
  };

  // Handle logout
  // Modified logout function in Home.js
  const logout = async () => {
    let csrfToken = Cookies.get("XSRF-TOKEN");
  
    if (!csrfToken) {
      console.error("CSRF token still missing! Cannot proceed with logout.");
      console.log("Available Cookies:", document.cookie);
      return;
    }
  
    try {
      const response = await axios.post("/api/logout", {}, {
        headers: {
          "X-XSRF-TOKEN": csrfToken
        },
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log("Logged out successfully", response.data);
        setAuthenticated(false); // Set authentication to false
        navigate("/login"); // Explicitly navigate to the login page
      } else {
        console.error("Unexpected status during logout:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error.response || error.message);
    }
  };

  useEffect(() => {
    // Fetch user data when component mounts
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
            <h2>Welcome, {user?.fullname || "User"}!</h2>
            <p>Please log out until we implement other features, thanks!</p>
            <Button variant="contained" color="primary" onClick={logout}>
              Logout
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/protected')} style={{ marginTop: '20px' }}>
              Go to Protected Page
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
