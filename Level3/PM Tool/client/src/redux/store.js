import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
// Optional: import persistStore if you decide to implement redux-persist
// import { persistStore } from "redux-persist";

// Create the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Include apiSlice middleware
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development only
});

// Optional: Set up persistor if using redux-persist
// export const persistor = persistStore(store);

export default store;
