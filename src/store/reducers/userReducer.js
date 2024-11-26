import { createSlice } from "@reduxjs/toolkit";

import { logoutUser, authenticateUser } from "../actions/userActions";

const initialState = {
  isUserAuthenticated: false,
  userDetails: {
    id: "",
    name: "",
    email: "",
  },
};

const userSlice = createSlice({
  name: "userStateSlice",
  initialState: {
    value: 0,
  },
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
  builder.addCase(logoutUser.pending, (state, action) => {});
  builder.addCase(logoutUser.fulfilled, (state, action) => {
    state = initialState;
  });
  builder.addCase(logoutUser.rejected, (state, action) => {});
};

const userAuthenticationCases = (builder) => {
  builder.addCase(authenticateUser.pending, (state, action) => {});
  builder.addCase(authenticateUser.fulfilled, (state, action) => {});
  builder.addCase(authenticateUser.rejected, (state, action) => {});
};

// export any actions in the reducer (not counting extraReducers)
export const { resetUserState } = userSlice.actions;
// export the reducer
export default userSlice.reducer;
