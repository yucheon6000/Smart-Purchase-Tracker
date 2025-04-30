import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { ReactNode } from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
          "@media (max-width: 500px)": {
            px: 1,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
