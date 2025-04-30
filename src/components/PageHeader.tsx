import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const BackButton = styled(IconButton)({
  //   position: "absolute",
  //   left: "8px",
});

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Typography
      variant="h6"
      sx={{
        textAlign: "left",
        fontWeight: "600",
        mb: 3,
        pl: showBackButton ? 0 : 2,
      }}
    >
      {showBackButton && (
        <BackButton onClick={handleBack} size="small">
          <ArrowBackIosNewIcon />
        </BackButton>
      )}
      {title}
    </Typography>
  );
};

export default PageHeader;
