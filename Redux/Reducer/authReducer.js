import { createSlice } from "@reduxjs/toolkit";
import authAction from "../Actions/authAction";

const initialState = {
  accessToken: null,
  cliqueOptions: null,
  selectedClique: null,
  notification: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authAction,
});

export const { actions: authActions } = authSlice;
export default authSlice.reducer;
