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
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(", "),
    allVariants: {
      fontFeatureSettings:
        "'ss01' on, 'ss05' on, 'ss06' on, 'liga' off, 'clig' off",
      textDecorationThickness: "1px",
      textUnderlineOffset: "2px",
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
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "150%",
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
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiCardContent-variantHeading": {
            padding: "0.5rem 1rem",
            "& .MuiTypography-body2": {
              color: theme.palette.text.secondary,
              fontSize: "0.875rem",
              fontWeight: 400,
              lineHeight: "150%",
            },
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
          lineHeight: 1.4,
          textTransform: "capitalize",
          minHeight: "44px",
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          fontSize: "0.875rem",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "150%",
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
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "1.4",
          textTransform: "capitalize",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        outlinedInherit: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
            border: `1px solid ${theme.palette.divider}`,
          },
        }),
        containedPrimary: ({ theme }) => ({
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          boxShadow: "none",
          "&:hover": {
            background: theme.palette.primary.dark,
            boxShadow: "none",
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationThickness: "1px",
          textUnderlineOffset: "2px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#334155 transparent",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#334155",
            borderRadius: "3px",
          },
        },
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
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 500,
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
          fontWeight: 400,
        },
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
