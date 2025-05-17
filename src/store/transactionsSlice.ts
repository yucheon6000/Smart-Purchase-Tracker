// Redux Toolkit의 createSlice를 사용하여 트랜잭션 관련 상태와 리듀서를 정의합니다.
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
        'http://15.165.92.130:8000/predict',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData }),
        }
      );
      const result = await response.json();
      if (result.purchaseItems) {
        // 카테고리 문자열을 ID로 변환
        const mappedItems = result.purchaseItems.map((item: { item: string; count: number; price_per_one: number; price: number; category: string }): PurchaseItem => {
          const category = categories.find(c => c.fullName === item.category);
          return {
            id: Math.random().toString(36).substr(2, 9), // 임시 ID 생성
            name: item.item,
            quantity: item.count,
            unitPrice: item.price_per_one,
            totalPrice: item.price,
            categoryId: category?.id || -1 // 매칭되는 카테고리가 없으면 -1(기타)으로 설정
          };
        });
        return { transactionId, purchaseItems: mappedItems };
      } else {
        return rejectWithValue(result.error || 'No purchase items');
      }
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : 'Upload failed');
    }
  }
);

// 트랜잭션 상태의 타입을 정의합니다.
interface TransactionsState {
  transactions: Transaction[];
  receiptUploadLoading?: boolean;
  receiptUploadError?: string | null;
}

// 초기 상태를 설정합니다.
const initialState: TransactionsState = {
  transactions: initialTransactions,
};

// 트랜잭션 관련 slice를 생성합니다.
const transactionsSlice = createSlice({
  name: 'transactions', // slice의 이름
  initialState,         // 초기 상태
  reducers: {           // 상태를 변경하는 리듀서 함수들

    // 트랜잭션 목록을 설정합니다.
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    // 트랜잭션을 추가합니다.
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    // 트랜잭션을 수정합니다.
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const idx = state.transactions.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.transactions[idx] = action.payload;
    },
    // 트랜잭션을 삭제합니다.
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
        const { transactionId, purchaseItems } = action.payload;
        const idx = state.transactions.findIndex(t => t.id === transactionId);
        if (idx !== -1) {
          state.transactions[idx] = {
            ...state.transactions[idx],
            items: purchaseItems,
          };
        }
      })
      .addCase(uploadReceipt.rejected, (state, action) => {
        state.receiptUploadLoading = false;
        state.receiptUploadError = action.payload as string || '영수증 처리 실패';
      });
  },
});

// 액션과 리듀서를 export 합니다.
export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
