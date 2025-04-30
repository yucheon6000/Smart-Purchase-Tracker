import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#3182F6",
            light: "#5C9FFF",
            dark: "#1B64DA",
        },
        secondary: {
            main: "#00C853",
            light: "#69F0AE",
            dark: "#00B248",
        },
        background: {
            default: "#F7F8FA",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1A1C1E",
            secondary: "#4A4F55",
            disabled: "#999999",
        },
        error: {
            main: "#FF5722",
        }
    },
    typography: {
        fontFamily:
            `"Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`,
        h4: {
            fontWeight: 700,
            fontSize: "2rem",
        },
        h5: {
            fontWeight: 700,
            fontSize: "1.5rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: "1rem",
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: "0.875rem",
        },
        body1: {
            fontWeight: 500,
            fontSize: "1rem",
        },
        body2: {
            fontSize: "0.875rem",
        },
        caption: {
            fontSize: "0.75rem",
            color: "#999999",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
    },
}); 