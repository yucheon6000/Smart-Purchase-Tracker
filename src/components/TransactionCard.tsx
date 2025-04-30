import React from "react";
import { Transaction } from "../mocks/transactions";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

interface TransactionCardProps {
  transaction: Transaction;
  showDate?: boolean;
}

const Card = styled(Box)(({ theme }) => ({
  padding: "16px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  "&:active": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
}));

const MainRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "4px",
});

const Date = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginRight: "12px",
}));

const Description = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.primary,
  flex: 1,
  textAlign: "left",
}));

const Amount = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type: "income" | "expense" }>(({ theme, type }) => ({
  ...theme.typography.subtitle2,
  color:
    type === "income" ? theme.palette.primary.main : theme.palette.error.main,
  fontWeight: 600,
}));

const AmountTotal = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  textAlign: "left",
}));

const Time = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  flex: 1,
  textAlign: "left",
}));

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  showDate = true,
}) => {
  const navigate = useNavigate();

  const formattedDate = transaction.date.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  });

  const formattedAmount = new Intl.NumberFormat("ko-KR").format(
    transaction.amount
  );

  const handleClick = () => {
    navigate(`/transaction/${transaction.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <MainRow>
        {showDate && <Date>{formattedDate}</Date>}
        {!showDate && (
          <Date sx={{ visibility: "hidden" }}>{formattedDate}</Date>
        )}
        <Description>{transaction.description}</Description>
        <Amount type={transaction.type}>
          {transaction.type == "expense" ? "-" : ""}
          {formattedAmount}원
        </Amount>
      </MainRow>
      <MainRow>
        <Date sx={{ visibility: "hidden" }}>{formattedDate}</Date>
        <Time>{transaction.time}</Time>
        <AmountTotal>{formattedAmount}원</AmountTotal>
      </MainRow>
    </Card>
  );
};

export default TransactionCard;
