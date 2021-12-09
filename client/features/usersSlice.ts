import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  showUsers: boolean;
}

const initialState: InitialStateProps = {
  showUsers: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    hideUsersAction(state, action) {
      state.showUsers = false;
    },
    showUsersAction(state, action) {
      state.showUsers = true;
    },
  },
});

export const { hideUsersAction, showUsersAction } = usersSlice.actions;
export default usersSlice.reducer;
