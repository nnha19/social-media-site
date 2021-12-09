import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import usersSlice from "../features/usersSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
