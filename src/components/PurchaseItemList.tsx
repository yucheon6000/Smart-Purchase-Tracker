import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { PurchaseItem } from "../mocks/transactions";

interface PurchaseItemListProps {
  items: PurchaseItem[];
}

const PurchaseItemList: React.FC<PurchaseItemListProps> = ({ items }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        구매 항목
      </Typography>
      <Box>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity}개 × {item.unitPrice.toLocaleString()}원
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {item.totalPrice.toLocaleString()}원
              </Typography>
            </Box>
            {index < items.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default PurchaseItemList;
