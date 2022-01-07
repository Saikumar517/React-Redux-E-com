import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const loggedIn = createSlice({
  name: "LoggedIn",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const loggeInActions = loggedIn.actions;

export default loggedIn.reducer;
