import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  load: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Signinstart: (state) => {
      state.load = true;
    },
    SigninSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.load = false;
      state.error = null;
    },
    Signinfailure: (state, action) => {
      state.error = action.payload;
      state.load = false;
    },
    Updatesuccess: (state, action) => {
      state.currentUser = action.payload;
      state.load = false;
      state.error = null;
    },
    Updatefailure: (state, action) => {
      state.load = false;
      state.error = action.payload;
    },
    Updatestart: (state) => {
      state.load = true;
      state.error = null;
    },
    DeleteUserstart: (state) => {
      state.load = true;
    },
    DeleteUsersuccess: (state) => {
      state.load = false;
      state.currentUser = null;
      state.error = null;
    },
    DeleteUserfailure: (state, action) => {
      state.error = action.payload;
      state.load = false;
    },
    SignoutUserstart: (state) => {
      state.load = true;
    },
    SignoutUsersuccess: (state) => {
      state.load = false;
      state.currentUser = null;
      state.error = null;
    },
    SignoutUserfailure: (state, action) => {
      state.error = action.payload;
      state.load = false;
    },
  },
});
export const {
  DeleteUserfailure,
  DeleteUsersuccess,
  DeleteUserstart,
  Signinstart,
  SigninSuccess,
  Signinfailure,
  Updatefailure,
  Updatestart,
  Updatesuccess,
  SignoutUserfailure,
  SignoutUserstart,
  SignoutUsersuccess,
} = userSlice.actions;
export default userSlice.reducer;
