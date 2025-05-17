import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Box,
  Typography,
  Paper,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import { categories } from "../mocks/categories";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import dayjs from "dayjs";
import PeriodSelector from "../components/PeriodSelector";
import ViewToggle from "../components/ViewToggle";
import CategoryDot from "../components/CategoryDot";
import { getAllYears } from "../utils/transactionUtils";
import { useTheme } from "@mui/material";

function getPeriodKey(date: Date, period: string) {
  if (period === "day") return date.toISOString().slice(0, 10);
  if (period === "month") return date.toISOString().slice(0, 7);
  if (period === "year") return date.getFullYear().toString();
  return "";
}

const Statistics = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const today = dayjs();
  const allYears = getAllYears(transactions);
  const [period, setPeriod] = useState("year");
  const [view, setView] = useState("table");
  const [selectedYear, setSelectedYear] = useState(today.year());
  const [selectedMonth, setSelectedMonth] = useState(today.month() + 1); // dayjs: 0-indexed
  const [selectedDate, setSelectedDate] = useState(today);
  const theme = useTheme();

  let currentPeriodKey = "";
  if (period === "day") currentPeriodKey = selectedDate.format("YYYY-MM-DD");
  if (period === "month")
    currentPeriodKey = `${selectedYear}-${selectedMonth
      .toString()
      .padStart(2, "0")}`;
  if (period === "year") currentPeriodKey = selectedYear.toString();

  // 선택된 기간에 해당하는 거래만 필터링
  const filtered = transactions.filter((t) => {
    const key = getPeriodKey(t.date, period);
    return key === currentPeriodKey && t.type === "expense";
  });

  // 카테고리별 합계 계산 (items 우선, 없으면 transaction)
  const categorySums: Record<number, number> = {};
  filtered.forEach((t) => {
    if (t.items && t.items.length > 0) {
      t.items.forEach((item) => {
        const catId = item.categoryId ?? t.categoryId;
        categorySums[catId] = (categorySums[catId] || 0) + item.totalPrice;
      });
    } else {
      categorySums[t.categoryId] = (categorySums[t.categoryId] || 0) + t.amount;
    }
  });

  // 그래프용 데이터
  const chartData = categories.map((cat) => ({
    name: cat.name,
    sum: categorySums[cat.id] || 0,
    color: cat.color,
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <PageHeader title="통계" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            mb: 2,
          }}
        >
          <ViewToggle view={view} setView={setView} />
          <PeriodSelector
            period={period}
            setPeriod={setPeriod}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            allYears={allYears}
          />
        </Box>
        {view === "table" ? (
          <Paper
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              mb: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>카테고리</th>
                  <th style={{ textAlign: "right", padding: 8 }}>합계</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ padding: 8, textAlign: "left" }}>
                      <CategoryDot color={cat.color} />
                      {cat.name}
                    </td>
                    <td style={{ textAlign: "right", padding: 8 }}>
                      {categorySums[cat.id]?.toLocaleString() || 0}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        ) : (
          // 그래프
          <Paper
            sx={{
              height: Math.max(320, chartData.length * 40),
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              mb: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
                style={{
                  fontFamily: theme.typography.body2.fontFamily,
                  background: theme.palette.background.paper,
                }}
              >
                <XAxis
                  type="number"
                  tickFormatter={(value) => value.toLocaleString()}
                  stroke={theme.palette.text.secondary}
                  tick={{ fill: theme.palette.text.primary, fontSize: 14 }}
                  axisLine={{ stroke: "0" }}
                  tickLine={{ stroke: "0" }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 16, fill: theme.palette.text.primary }}
                  width={50}
                  stroke={theme.palette.text.secondary}
                  axisLine={{ stroke: "0" }}
                  tickLine={{ stroke: "0" }}
                />
                <Tooltip
                  contentStyle={{
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.primary,
                    fontFamily: theme.typography.body2.fontFamily,
                  }}
                  labelStyle={{ color: theme.palette.text.secondary }}
                  itemStyle={{ color: theme.palette.text.primary }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Bar dataKey="sum">
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        )}
        {filtered.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            해당 기간에 지출 내역이 없습니다.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Statistics;
