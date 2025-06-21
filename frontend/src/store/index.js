import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import receptionistReducer from "./slices/receptionistSlice.js";
import queueReducer from "./slices/queueSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    receptionists: receptionistReducer,
    queue: queueReducer,
  },
});
