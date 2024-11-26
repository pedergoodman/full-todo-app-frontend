import { createSlice } from "@reduxjs/toolkit";

import { logoutUser, authenticateUser } from "../actions/userActions";

const initialState = {
  loadingAuth: false,
  isUserAuthenticated: false,
  userDetails: {
    id: "",
    firstName: "",
    lastName: "",
    // fullName: "",
    email: "",
    oktaId: "",
  },
  error: null,
};

const userSlice = createSlice({
  name: "userStateSlice",
  initialState: initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    userLogoutCases(builder);
    userAuthenticationCases(builder);
    // userDataCases(builder);
  },
});

const userLogoutCases = (builder) => {
  builder.addCase(logoutUser.pending, (state, action) => {
    state.error = null; // Clears any previous errors
  });
  builder.addCase(logoutUser.fulfilled, (state, action) => {
    state = initialState;
  });
  builder.addCase(logoutUser.rejected, (state, action) => {
    state.error = action.error.message;
  });
};

const userAuthenticationCases = (builder) => {
  builder.addCase(authenticateUser.pending, (state, action) => {
    state.error = null; // Clears any previous errors
    state.loadingAuth = true;
  });
  builder.addCase(authenticateUser.fulfilled, (state, action) => {
    if (action.payload === "") {
      state.isUserAuthenticated = false;
    } else {
      state.isUserAuthenticated = true;
      state.userDetails = action.payload;
    }

    state.error = null;
    state.loadingAuth = false;
  });
  builder.addCase(authenticateUser.rejected, (state, action) => {
    state.isUserAuthenticated = false;
    state.error = action.error.message;
    state.loadingAuth = false;
  });
};

// export any actions in the reducer (not counting extraReducers)
export const { resetUserState } = userSlice.actions;
// export the reducer
export default userSlice.reducer;
