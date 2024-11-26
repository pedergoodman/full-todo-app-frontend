import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useCookies } from "react-cookie";
// const [cookies] = useCookies(["XSRF-TOKEN"]);
import { Cookies } from "react-cookie";

const cookies = new Cookies();
// const xsrfToken = cookies.get("XSRF-TOKEN");

export const loginUser = createAsyncThunk("user/loginUser", async () => {
  const response = await axios.get("api/v1/private", { withCredentials: true });
  return response.data;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const xsrfToken = cookies.get("XSRF-TOKEN");

  const response = await axios.post("/api/v1/logout", null, {
    withCredentials: true,
    headers: { "X-XSRF-TOKEN": xsrfToken },
  });

  console.log("In Logout Thunk. response is:", response);

  if (response.status !== 200) {
    console.log("Error logging out: ", response.status);
    throw new Error(`HTTP error! status: ${response}`);
  } else {
    console.log("Logged out successfully");

    // handle redirect to home page/ logout page
    window.location.href =
      `${response.data.logoutUrl}?id_token_hint=${response.data.idToken}` +
      `&post_logout_redirect_uri=${window.location.origin}`;
  }

  return response.data;
});

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async () => {
    const response = await axios.get("api/v1/user", { withCredentials: true });
    return response.data;
  }
);
