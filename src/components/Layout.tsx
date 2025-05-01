import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { ReactNode } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RestoreIcon from "@mui/icons-material/Restore";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navValue = location.pathname.startsWith("/statistics") ? 1 : 0;

  return (
    <Box
      id="layout"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "500px",
        maxWidth: "500px",
        margin: "0 auto",
        backgroundColor: "background.default",
        "@media (max-width: 500px)": {
          width: "100vw",
          maxWidth: "100%",
          left: "auto",
          transform: "none",
          top: 0,
          minHeight: "100vh",
        },
      }}
    >
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: 2,
            textAlign: "center",
          }}
        >
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              color: "primary.main",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <AccountBalanceWalletIcon
              sx={{
                color: "primary.main",
                fontSize: 24,
                marginRight: 1,
              }}
            />
            Smart Purchase Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          boxSizing: "border-box",
          px: 2,
          py: 3,
          marginTop: 8,
          marginBottom: 8, // 하단바 공간 확보
          "@media (max-width: 500px)": {
            px: 1,
          },
        }}
      >
        {children}
      </Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100vw",
          maxWidth: "100vw",
          margin: 0,
          borderRadius: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={navValue}
          onChange={(_, newValue) => {
            if (newValue === 0) navigate("/");
            if (newValue === 1) navigate("/statistics");
          }}
          showLabels
          sx={{ width: "100vw", maxWidth: "100vw" }}
        >
          <BottomNavigationAction
            label="내역"
            icon={<RestoreIcon />}
            sx={{ flex: 1 }}
          />
          <BottomNavigationAction
            label="통계"
            icon={<BarChartIcon />}
            sx={{ flex: 1 }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Layout;
