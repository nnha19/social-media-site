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
      console.log("Wayy.");
      state.usersDropdown = false;
      state.notiDropdown = false;
    },
    showDropdownAction(state, action) {
      state[action.payload.type] = true;
    },
  },
});

export const { hideDropdownAction, showDropdownAction } = usersSlice.actions;
export default usersSlice.reducer;
