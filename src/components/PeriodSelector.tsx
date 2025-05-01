import { Box, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface PeriodSelectorProps {
  period: string;
  setPeriod: (v: string) => void;
  selectedYear: number;
  setSelectedYear: (v: number) => void;
  selectedMonth: number;
  setSelectedMonth: (v: number) => void;
  selectedDate: Dayjs;
  setSelectedDate: (v: Dayjs) => void;
  allYears: number[];
}

const getMonths = () => Array.from({ length: 12 }, (_, i) => i + 1);

const PeriodSelector = ({
  period,
  setPeriod,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setSelectedDate,
  allYears,
}: PeriodSelectorProps) => {
  const today = dayjs();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Select
        size="small"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <MenuItem value="day">일간</MenuItem>
        <MenuItem value="month">월간</MenuItem>
        <MenuItem value="year">연간</MenuItem>
      </Select>
      {period === "year" && (
        <Select
          size="small"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {allYears.map((y) => (
            <MenuItem key={y} value={y}>
              {y}년
            </MenuItem>
          ))}
        </Select>
      )}
      {period === "month" && (
        <>
          <Select
            size="small"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {allYears.map((y) => (
              <MenuItem key={y} value={y}>
                {y}년
              </MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {getMonths().map((m) => (
              <MenuItem key={m} value={m}>
                {m}월
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      {period === "day" && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="날짜 선택"
            value={selectedDate}
            onChange={(v) => v && setSelectedDate(v)}
            format="YYYY-MM-DD"
            slotProps={{ textField: { size: "small" } }}
            maxDate={today}
          />
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default PeriodSelector;
