import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction, PurchaseItem } from '../mocks/transactions';
import { transactions as initialTransactions } from '../mocks/transactions';
import { categories } from '../mocks/categories';

// 영수증 이미지 업로드 및 항목 추출 비동기 thunk
export const uploadReceipt = createAsyncThunk(
  'transactions/uploadReceipt',
  async (
    { transactionId, imageData }: { transactionId: string; imageData: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        'https://api.spt.yucheon.io/predict',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData }),
        }
      );
      const result = await response.json();
      if (result.purchaseItems) {
        const mappedItems = result.purchaseItems.map((item: { item: string; count: number; price_per_one: number; price: number; category: string }): PurchaseItem => {
          const category = categories.find(c => c.fullName == item.category);
          return {
            id: Math.random().toString(36).substr(2, 9), // 임시 ID
            name: item.item,
            quantity: item.count,
            unitPrice: item.price_per_one,
            totalPrice: item.price,
            categoryId: category?.id
          };
        });

        // 총 합계 계산
        const amount = mappedItems.reduce((sum: number, item: PurchaseItem) => sum + item.totalPrice, 0);

        // 새로운 거래내역 생성 (TransactionList에서 호출된 경우)
        if (transactionId === "new") {
          const newTransaction: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(result.date),
            time: result.time,
            description: result.description,
            amount: amount,
            type: 'expense',
            items: mappedItems
          };
          return { transactionId, purchaseItems: mappedItems, newTransaction };
        }

        // 기존 거래내역 업데이트 (TransactionDetail에서 호출된 경우)
        return { transactionId, purchaseItems: mappedItems };
      } else {
        return rejectWithValue(result.error || 'No purchase items');
      }
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : 'Upload failed');
    }
  }
);

interface TransactionsState {
  transactions: Transaction[];
  receiptUploadLoading?: boolean;
  receiptUploadError?: string | null;
}

const initialState: TransactionsState = {
  transactions: initialTransactions,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const idx = state.transactions.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.transactions[idx] = action.payload;
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadReceipt.pending, (state) => {
        state.receiptUploadLoading = true;
        state.receiptUploadError = null;
      })
      .addCase(uploadReceipt.fulfilled, (state, action) => {
        state.receiptUploadLoading = false;
        const { transactionId, purchaseItems, newTransaction } = action.payload;

        if (newTransaction) {
          // 새로운 거래내역 추가 (TransactionList에서 호출된 경우)
          state.transactions.unshift(newTransaction);
        } else {
          // 기존 거래내역 업데이트 (TransactionDetail에서 호출된 경우)
          const idx = state.transactions.findIndex(t => t.id === transactionId);
          if (idx !== -1) {
            state.transactions[idx] = {
              ...state.transactions[idx],
              items: purchaseItems,
            };
          }
        }
      })
      .addCase(uploadReceipt.rejected, (state, action) => {
        state.receiptUploadLoading = false;
        state.receiptUploadError = action.payload as string || '영수증 처리 실패';
      });
  },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
