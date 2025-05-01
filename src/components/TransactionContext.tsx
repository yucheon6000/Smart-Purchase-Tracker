import React, { createContext, useContext, useState, ReactNode } from "react";
import { Transaction } from "../mocks/transactions";
import { transactions as initialTransactions } from "../mocks/transactions";

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("TransactionContext not found");
  return ctx;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
