import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import authSlice from "./authslice";
import storage from "redux-persist/lib/storage";
const actualStorage = storage.default ?? storage;
import { persistStore } from "redux-persist";


import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";



// Root Reducer
const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
});

// Persist Config
const persistConfig = {
  key: "root",
  version: 1,
  storage: actualStorage,
};

// Persisted Reducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

console.log("storage =", storage);
console.log("getItem =", storage?.getItem);
console.log("setItem =", storage?.setItem);


export const persistor = persistStore(store);
export default store;