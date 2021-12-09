import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import usersSlice from "../features/usersSlice";
import dropdownsSlice from "../features/dropdownsSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    drodowns: dropdownsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
