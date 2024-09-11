import React from "react"
import ReactDOM from "react-dom/client"
import { createTheme, ThemeProvider } from "@mui/material"

import App from "./App"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3facb5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontSize: 18,
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
