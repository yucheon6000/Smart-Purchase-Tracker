import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PurchaseItemList from "../components/PurchaseItemList";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { uploadReceipt } from "../store/transactionsSlice";
import ReceiptUploadButton from "../components/ReceiptUploadButton";

const TransactionDetail = () => {
  // ====== 변수 선언부 (정렬) ======
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const receiptUploadLoading = useSelector(
    (state: RootState) => state.transactions.receiptUploadLoading
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const transaction = transactions.find((t) => t.id === id);
  const dateObj = transaction?.date;

  // ====== 이펙트 ======
  useEffect(() => {
    // 페이지 진입 시 스크롤 맨 위로 이동
    topRef.current?.scrollIntoView({ behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // ====== 핸들러 ======
  // 버튼 누르면 <input type="file"> 트리거
  const handleReceiptScan = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일이 선택(또는 촬영)된 뒤 호출
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !transaction) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      try {
        await dispatch(
          uploadReceipt({ transactionId: transaction.id, imageData })
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

  // ====== 렌더 ======
  /* --- 거래가 없을 때 --- */
  if (!transaction) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>거래 내역을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  /* --- 날짜·금액 포맷 --- */
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    : "";
  const formattedAmount = new Intl.NumberFormat("ko-KR").format(
    transaction.amount
  );

  /* --- 실제 렌더링 --- */
  return (
    <Box ref={topRef}>
      <PageHeader title="상세 내역" showBackButton />

      {/* 거래 기본 정보 카드 */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          mb: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          {transaction.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">금액</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color:
                transaction.type === "income" ? "primary.main" : "error.main",
            }}
          >
            {transaction.type === "expense" ? "-" : ""}
            {formattedAmount}원
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">날짜</Typography>
          <Typography>{formattedDate}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">시간</Typography>
          <Typography>{transaction.time}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">유형</Typography>
          <Typography>
            {transaction.type === "income" ? "수입" : "지출"}
          </Typography>
        </Box>

        {/* 구매 항목 */}
        {transaction.items && transaction.items.length > 0 && (
          <PurchaseItemList items={transaction.items} />
        )}
      </Box>

      {/* 영수증 촬영/업로드 버튼 */}
      <Box sx={{ p: 2 }}>
        <ReceiptUploadButton
          uploading={!!receiptUploadLoading}
          onClick={handleReceiptScan}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};

export default TransactionDetail;
