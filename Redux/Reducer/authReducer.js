import { createSlice } from "@reduxjs/toolkit";
import authAction from "../Actions/authAction";

const initialState = {
  accessToken: null,
  notification: null,
  cliqueOptions: null,
  selectedClique: null,
  loginNo: "9564621375",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authAction,
});

export const { actions: authActions } = authSlice;
export default authSlice.reducer;
