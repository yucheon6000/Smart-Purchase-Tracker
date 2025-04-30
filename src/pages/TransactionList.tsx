import { Box } from "@mui/material";
import TransactionCard from "../components/TransactionCard";
import { transactions } from "../mocks/transactions";
import PageHeader from "../components/PageHeader";

const TransactionList = () => {
  // 날짜별로 그룹화하고 시간으로 정렬
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const dateKey = transaction.date.toISOString().split("T")[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  // 날짜 키를 최신순으로 정렬
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <Box>
      <PageHeader title={"거래 내역"} />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {sortedDates.map((dateKey) => {
          // 각 날짜 그룹 내에서 시간 기준 내림차순 정렬
          const sortedTransactions = groupedTransactions[dateKey].sort((a, b) =>
            b.time.localeCompare(a.time)
          );

          return sortedTransactions.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              showDate={index === 0} // 각 날짜 그룹의 첫 번째 항목만 날짜 표시
            />
          ));
        })}
      </Box>
    </Box>
  );
};

export default TransactionList;
