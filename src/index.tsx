import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./Hooks/UseCart";
import { AuthProvider } from "./Hooks/UseAuth";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1380,
    },
  },
});
root.render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: {
          background: "rgb(51 65 85)",
          color: "#fff",
        },
      }}
    ></Toaster>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
