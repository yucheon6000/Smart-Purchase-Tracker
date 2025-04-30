import { Typography, Box, Button, Dialog, DialogContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { transactions } from "../mocks/transactions";
import { categories } from "../mocks/categories";
import PageHeader from "../components/PageHeader";
import PurchaseItemList from "../components/PurchaseItemList";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState, useRef, useEffect } from "react";

const TransactionDetail = () => {
  const { id } = useParams();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const transaction = transactions.find((t) => t.id === id);
  const category = categories.find((c) => c.id === transaction?.categoryId);

  useEffect(() => {
    if (isCameraOpen && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("카메라 접근 오류:", err);
          alert("카메라 접근 권한이 필요합니다.");
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen]);

  const handleReceiptScan = () => {
    if (isMobile) {
      setIsCameraOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        // TODO: 이미지 데이터 처리 (서버 전송 등)
        console.log("캡처된 이미지:", imageData);
        handleCloseCamera();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        // TODO: 이미지 데이터 처리 (서버 전송 등)
        console.log("선택된 이미지:", imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!transaction) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>거래 내역을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  const formattedDate = new Date(transaction.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const formattedAmount = new Intl.NumberFormat("ko-KR").format(
    transaction.amount
  );

  return (
    <Box>
      <PageHeader title="상세 내역" showBackButton />

      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          mb: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "600" }}>
          {transaction.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography color="text.secondary">금액</Typography>
          <Typography
            sx={{
              fontWeight: "600",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
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
          {isMobile ? "영수증 촬영" : "영수증 업로드"}
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Box>

      <Dialog
        open={isCameraOpen}
        onClose={handleCloseCamera}
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "black",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseCamera}
              sx={{ borderRadius: 2 }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              onClick={handleCapture}
              sx={{ borderRadius: 2 }}
            >
              촬영
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TransactionDetail;
