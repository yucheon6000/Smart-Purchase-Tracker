import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { PurchaseItem } from "../mocks/transactions";
import { categories } from "../mocks/categories";

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
        {items.map((item, index) => {
          // 각 항목의 categoryId를 우선 사용, 없으면 2(식비)로 대체
          const category = categories.find(
            (c) => c.id === (item.categoryId || 2)
          );
          return (
            <React.Fragment key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                      bgcolor: category?.color || "#eee",
                      color: "#fff",
                      minWidth: 60,
                      textAlign: "center",
                      textWrap: "nowrap",
                      flexShrink: 0,
                      mr: 0.1,
                    }}
                  >
                    {category?.name || "기타"}
                  </Box>
                  <Box sx={{ mr: 0.1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, textAlign: "start" }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "start" }}
                    >
                      {item.unitPrice.toLocaleString()}원 × {item.quantity}개
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, flexShrink: 0 }}
                >
                  {item.totalPrice.toLocaleString()}원
                </Typography>
              </Box>
              {index < items.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default PurchaseItemList;
