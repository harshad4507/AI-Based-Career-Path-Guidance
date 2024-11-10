import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Create the root for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with optional removal of React.StrictMode for development
root.render(
  // Uncomment the next line if you want to keep StrictMode for catching issues in development
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode> // Comment out or remove this line for preventing double useEffect
);
