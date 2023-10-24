import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./countslice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({ counter: counterReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export let persistor = persistStore(store);

