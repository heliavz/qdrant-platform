import { createTheme as createMuiTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { darkThemeOptions } from "./dark-theme";

const themeOptions = {
  typography: {
    fontFamily: [
      '"Mona Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(", "),
    allVariants: {
      fontFeatureSettings:
        "'ss01' on, 'ss05' on, 'ss06' on, 'liga' off, 'clig' off",
    },
    h4: {
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: 1.25,
      letterSpacing: "-0.5px",
    },
    h5: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "8px",
          border: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paperElevation1,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: "1.4",
          textTransform: "capitalize",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: ({ theme }) => ({
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            background: theme.palette.primary.dark,
          },
        }),
        outlinedInherit: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "capitalize",
          minHeight: "40px",
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#334155 transparent",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#334155",
            borderRadius: "3px",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          background: theme.palette.background.paperElevation1,
          borderRight: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.light, 0.05),
          },
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.light, 0.08),
            "& .MuiListItemIcon-root": {
              color: theme.palette.primary.main,
            },
            "& .MuiListItemText-primary": {
              color: theme.palette.text.primary,
            },
          },
        }),
      },
    },
  },
};

const baseTheme = createMuiTheme(themeOptions);

export const createTheme = (config = {}) => {
  const merged = deepmerge(deepmerge(baseTheme, darkThemeOptions), config);
  return createMuiTheme(merged);
};

export const darkTheme = createTheme({ palette: { mode: "dark" } });
