import { createSlice } from "@reduxjs/toolkit";
import { messages } from "./message";

const initialState = {
  roomId: "",
  messages: messages,
  user: {
    email: null,
    status: {
      online: false,
      lastSeen: null,
    },
    name: null,
  },
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomId = action.payload?.id;
      if (action.payload.email) {
        state.user.email = action.payload?.email;
      }
      if (action.payload.name) {
        state.user.name = action.payload?.name;
      }
      if (action.payload.status) {
        state.user.status = action.payload?.status;
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setUserStatus: (state, action) => {
      state.user.status = action.payload;
    },
    setUserName: (state, action) => {
      state.user.name = action.payload;
    },
    setUserEmail: (state, action) => {
      state.user.email = action.payload;
    },
    clearRoom: (state) => {
      state.roomId = null;
      state.messages = [];
      state.user = {
        email: null,
        status: { online: false, lastSeen: null },
        name: null,
      };
    },
  },
});

export const {
  setRoom,
  addMessage,
  setMessages,
  setUserStatus,
  setUserName,
  setUserEmail,
  clearRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
