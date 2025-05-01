import { Box } from "@mui/material";

const CategoryDot = ({ color }: { color: string }) => (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      width: 12,
      height: 12,
      bgcolor: color,
      borderRadius: "50%",
      mr: 1,
      verticalAlign: "middle",
    }}
  />
);

export default CategoryDot;
