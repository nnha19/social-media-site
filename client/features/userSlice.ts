import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../types/types";

interface UserAttributes {
  authMode: "signup" | "signin" | "facebook/auth";
  data: IUser;
}

interface UserState {
  user: IUser;
  loading: boolean;
  error: false | string;
}

const initialState: UserState = {
  user: {} as IUser,
  loading: false,
  error: null,
};

export const signUpAsyncThunk = createAsyncThunk<
  IUser,
  UserAttributes,
  {
    extra: {
      jwt: string;
    };
    rejectValue: string;
  }
>(
  "users/signUpAsyncThunk",
  async ({ authMode, data }: UserAttributes, { rejectWithValue }) => {
    try {
      const resp = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${authMode}`,
        method: "POST",
        data,
      });
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cancelError: (state, action) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signUpAsyncThunk.rejected, (state, action) => {
      const { payload } = action;
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(signUpAsyncThunk.pending, (state, action) => {
      state.loading = true;
    });
  },
});
export const { cancelError } = userSlice.actions;
export default userSlice.reducer;
