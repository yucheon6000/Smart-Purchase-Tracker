import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";
import { theme } from "./styles/theme";
import { globalStyles } from "./styles/GlobalStyles";
import TransactionList from "./pages/TransactionList";
import Layout from "./components/Layout";
import TransactionDetail from "./pages/TransactionDetail";
import Statistics from "./pages/Statistics";
import "./App.css";
import { useEffect } from "react";
import { transactions } from "./mocks/transactions";
import { Provider } from "react-redux";
import store from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "./store/transactionsSlice";
import { RootState } from "./store/store";

const TRANSACTIONS_VERSION = "2025-05-28";

// window.__INITIALIZED__ 타입 선언 (전역 확장)
declare global {
  interface Window {
    __INITIALIZED__?: boolean;
  }
}

// 저장된 데이터 로드
function getInitialTransactions() {
  try {
    const saved = localStorage.getItem("transactions_v" + TRANSACTIONS_VERSION);
    if (saved) {
      const parsed = JSON.parse(saved);

      return parsed.map((t: any) => ({
        ...t,
        date: new Date(t.date),
        items: Array.isArray(t.items)
          ? t.items.map((item: any) => ({ ...item }))
          : undefined,
      }));
    }
  } catch {}
  return transactions;
}

// 데이터 저장
function saveTransactions(data: typeof transactions) {
  // date는 string(ISO 포맷)으로 변환해서 저장 (items가 없으면 undefined로 저장)
  const serialized = data.map((t) => ({
    ...t,
    date: t.date instanceof Date ? t.date.toISOString() : t.date,
    items: Array.isArray(t.items)
      ? t.items.map((item) => ({ ...item }))
      : undefined,
  }));
  localStorage.setItem(
    "transactions_v" + TRANSACTIONS_VERSION,
    JSON.stringify(serialized)
  );
}

function LocalStorageSync() {
  const dispatch = useDispatch();
  const txs = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  // 최초 마운트 시 localStorage -> redux로 초기화 (한 번만 실행)
  useEffect(() => {
    dispatch(setTransactions(getInitialTransactions()));
  }, []);
  // redux 업데이트 시 localStorage로 동기화 (마운트 이후에만 동작)
  useEffect(() => {
    if (window.__INITIALIZED__) {
      saveTransactions(txs);
    } else {
      window.__INITIALIZED__ = true;
    }
  }, [txs]);
  return null;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Global styles={globalStyles} />
        <LocalStorageSync />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<TransactionList />} />
              <Route path="/transaction/:id" element={<TransactionDetail />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
