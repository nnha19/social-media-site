import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  usersDropdown: boolean;
  notiDropdown: boolean;
}

const initialState: InitialStateProps = {
  usersDropdown: false,
  notiDropdown: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    hideDropdownAction(state, action) {
      state.usersDropdown = false;
      state.notiDropdown = false;
    },
    showDropdownAction(state, action) {
      state[action.payload.type] = action.payload.type;
    },
  },
});

export const { hideDropdownAction, showDropdownAction } = usersSlice.actions;
export default usersSlice.reducer;
