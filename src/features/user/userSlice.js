import { courses } from "@/utils/courses";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Tutedude Mentor",
  email: "mentor@tutedude.com",
  courses: courses,
  userId: "60a7b0f0b18b0d1234567890",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, email, courses } = action.payload;
      state.name = name;
      state.email = email;
      state.courses = courses || [];
    },
    updateName(state, action) {
      state.name = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
    setCourse(state, action) {
      state.courses = action.payload;
    },
    removeCourse(state, action) {
      state.courses = state.courses.filter(
        (course) => course !== action.payload
      );
    },
  },
});

export const {
  setUser,
  updateName,
  updateEmail,
  addCourse,
  removeCourse,
  setCourse,
} = userSlice.actions;

export default userSlice.reducer;
