import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";
import { theme } from "./styles/theme";
import { globalStyles } from "./styles/GlobalStyles";
import TransactionList from "./pages/TransactionList";
import Layout from "./components/Layout";
import TransactionDetail from "./pages/TransactionDetail";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
