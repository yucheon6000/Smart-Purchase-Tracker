import { Box } from "@mui/material";
import TransactionCard from "../components/TransactionCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PageHeader from "../components/PageHeader";
import {
  groupTransactionsByDate,
  getSortedDateKeys,
} from "../utils/transactionUtils";

const CURRENT_BALANCE = 4825000;

const TransactionList = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const groupedTransactions = groupTransactionsByDate(transactions);
  const sortedDates = getSortedDateKeys(groupedTransactions);

  let balance = CURRENT_BALANCE;

  return (
    <Box>
      <PageHeader title={"거래 내역"} />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {sortedDates.map((dateKey) => {
          const sortedTransactions = groupedTransactions[dateKey].sort((a, b) =>
            b.time.localeCompare(a.time)
          );

          return sortedTransactions.map((transaction, index) => {
            const spentAmount =
              transaction.type == "expense"
                ? -transaction.amount
                : transaction.amount;

            balance -= spentAmount;

            return (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                showDate={index === 0} // 각 날짜 그룹의 첫 번째 항목만 날짜 표시
                balance={balance + spentAmount}
              />
            );
          });
        })}
      </Box>
    </Box>
  );
};

export default TransactionList;
