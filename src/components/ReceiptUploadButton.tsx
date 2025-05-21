import { Button, CircularProgress } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { RefObject } from "react";

interface ReceiptUploadButtonProps {
  uploading: boolean;
  onClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReceiptUploadButton = ({
  uploading,
  onClick,
  fileInputRef,
  onFileChange,
}: ReceiptUploadButtonProps) => (
  <>
    <input
      type="file"
      accept="image/*"
      capture="environment"
      ref={fileInputRef}
      onChange={onFileChange}
      style={{ display: "none" }}
    />
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      sx={{
        py: 1.5,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        bgcolor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        "&:hover": { bgcolor: (theme) => theme.palette.primary.dark },
      }}
      disabled={uploading}
    >
      {uploading ? (
        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
      ) : (
        <CameraAltIcon sx={{ mr: 1 }} />
      )}
      {uploading ? "분석 중..." : "영수증 촬영"}
    </Button>
  </>
);

export default ReceiptUploadButton;
