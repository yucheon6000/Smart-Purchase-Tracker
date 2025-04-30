import { Typography, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { transactions } from "../mocks/transactions";
import { categories } from "../mocks/categories";
import PageHeader from "../components/PageHeader";
import PurchaseItemList from "../components/PurchaseItemList";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef } from "react";

const TransactionDetail = () => {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const transaction = transactions.find((t) => t.id === id);
  const category = categories.find((c) => c.id === transaction?.categoryId);

  // 버튼 누르면 <input type="file"> 트리거
  const handleReceiptScan = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일이 선택(또는 촬영)된 뒤 호출
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      console.log("선택된 이미지:", imageData);
      // TODO: 서버 전송 등 처리
    };
    reader.readAsDataURL(file);
  };

  /* --- 거래가 없을 때 --- */
  if (!transaction) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>거래 내역을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  /* --- 날짜·금액 포맷 --- */
  const formattedDate = new Date(transaction.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const formattedAmount = new Intl.NumberFormat("ko-KR").format(
    transaction.amount
  );

  /* --- 실제 렌더링 --- */
  return (
    <Box>
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

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">카테고리</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: category?.color,
              }}
            />
            <Typography>{category?.name}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">유형</Typography>
          <Typography>
            {transaction.type === "income" ? "수입" : "지출"}
          </Typography>
        </Box>

        {transaction.items && transaction.items.length > 0 && (
          <PurchaseItemList items={transaction.items} />
        )}
      </Box>

      {/* 영수증 촬영/업로드 버튼 */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<CameraAltIcon />}
          onClick={handleReceiptScan}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          영수증 촬영 / 업로드
        </Button>

        {/* 모바일:카메라 / 데스크톱:파일창 */}
        <input
          type="file"
          accept="image/*"
          capture="environment" /* 후면 카메라 우선 */
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Box>
    </Box>
  );
};

export default TransactionDetail;
