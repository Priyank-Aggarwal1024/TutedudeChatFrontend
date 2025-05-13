import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import uiReducer from "@/features/ui/uiSlice";
import roomReducer from "@/features/room/roomSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["room/setRoom"],
      },
    }),
});

export default store;
