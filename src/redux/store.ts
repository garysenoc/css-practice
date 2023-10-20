import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./countslice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

