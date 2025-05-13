import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeVideoId: null,
  windowWidth: window.innerWidth,
  openChat: false,
  mentorAvailable: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveVideoId(state, action) {
      state.activeVideoId = action.payload;
    },
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
    setOpenChat(state, action) {
      state.openChat = action.payload;
    },
    setMentorAvailable(state, action) {
      state.mentorAvailable = action.payload;
    },
  },
});

export const {
  setActiveVideoId,
  setWindowWidth,
  setOpenChat,
  setMentorAvailable,
} = uiSlice.actions;

export default uiSlice.reducer;
