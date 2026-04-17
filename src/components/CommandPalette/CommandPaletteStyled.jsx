import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

// Full screen backdrop
export const Backdrop = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  zIndex: 1300,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: "120px",
}));

// The palette container
export const PaletteContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "580px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paperElevation3,
  boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "480px",
}));

// Search input wrapper
export const SearchRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

// Results area
export const ResultsList = styled(Box)(() => ({
  overflowY: "auto",
  flexGrow: 1,
  padding: "8px",
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "#334155",
    borderRadius: "2px",
  },
}));

// Group label
export const GroupLabel = styled(Box)(({ theme }) => ({
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  padding: "8px 10px 4px 10px",
  userSelect: "none",
}));

// Individual result item
export const ResultItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "9px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background 0.1s",
  backgroundColor: isActive
    ? alpha(theme.palette.primary.main, 0.12)
    : "transparent",
  "&:hover": {
    backgroundColor: isActive
      ? alpha(theme.palette.primary.main, 0.12)
      : theme.palette.action.hover,
  },
}));

// Icon box inside result item
export const ResultIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  backgroundColor: theme.palette.action.hover,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// Keyboard shortcut badge
export const KbdBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: 600,
  fontFamily: "monospace",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  lineHeight: 1.6,
  userSelect: "none",
}));

// Topbar trigger button
export const TriggerButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "5px 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paperElevation2,
  cursor: "pointer",
  transition: "border-color 0.15s, background 0.15s",
  userSelect: "none",
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.5),
    backgroundColor: theme.palette.action.hover,
  },
}));
