import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../models/user.model";
import { RootState } from "./store";

interface UserState {
  email: string;
  accessToken: string;
  error?: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: UserData;
}


const initialState: UserState = {
  email: "",
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUsername: (state, action: any) => {
      state.email = action.payload.userName;
    },
  },
  extraReducers: (builder) => {},
});

export const { resetUsername } = userSlice.actions;

export const userSelector = (store: RootState) => store.user;

export default userSlice.reducer;