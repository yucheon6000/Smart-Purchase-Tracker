import { Box } from "@mui/material";
import TransactionCard from "../components/TransactionCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import PageHeader from "../components/PageHeader";
import {
  groupTransactionsByDate,
  getSortedDateKeys,
} from "../utils/transactionUtils";
import { useRef } from "react";
import { uploadReceipt } from "../store/transactionsSlice";
import ReceiptUploadButton from "../components/ReceiptUploadButton";

const CURRENT_BALANCE = 4825000;

const TransactionList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const receiptUploadLoading = useSelector(
    (state: RootState) => state.transactions.receiptUploadLoading
  );

  const handleReceiptScan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      try {
        await dispatch(
          uploadReceipt({ transactionId: "new", imageData })
        ).unwrap();
      } catch (err: unknown) {
        let msg = "영수증 분석 중 에러가 발생했습니다.";
        if (typeof err === "object" && err !== null) {
          const errorObj = err as Record<string, unknown>;
          if (typeof errorObj.error === "string") msg = errorObj.error;
          else if (typeof errorObj.message === "string") msg = errorObj.message;
        }
        alert(msg + "\n다시 시도해 주세요.");
      }
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const groupedTransactions = groupTransactionsByDate(transactions);
  let sortedDates = getSortedDateKeys(groupedTransactions);
  sortedDates = sortedDates.sort((a, b) => b.localeCompare(a));

  // 각 날짜 그룹 내의 거래 내역을 시간순으로 정렬
  Object.keys(groupedTransactions).forEach((dateKey) => {
    groupedTransactions[dateKey].sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(":").map(Number);
      const [bHours, bMinutes] = b.time.split(":").map(Number);
      if (aHours !== bHours) return bHours - aHours;
      if (aMinutes !== bMinutes) return bMinutes - aMinutes;
      return b.id.localeCompare(a.id);
    });
  });

  let balance = CURRENT_BALANCE;

  return (
    <Box>
      <PageHeader title={"거래 내역"} />

      <Box sx={{ mb: 3 }}>
        <ReceiptUploadButton
          uploading={!!receiptUploadLoading}
          onClick={handleReceiptScan}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {sortedDates.map((dateKey) => {
          const transactions = groupedTransactions[dateKey];

          return transactions.map((transaction, index) => {
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
