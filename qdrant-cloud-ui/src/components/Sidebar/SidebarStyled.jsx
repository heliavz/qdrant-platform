import { styled, alpha } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { List, ListItemButton, Typography } from "@mui/material";

export const drawerWidth = 240;

export const Drawer = styled(MuiDrawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    overflowX: "hidden",
  },
}));

export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  display: "flex",
  height: "40px",
  padding: "8px 12px",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  alignSelf: "stretch",
  borderRadius: "8px",
  "& .MuiListItemText-primary": {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  "& .MuiListItemIcon-root": {
    color: theme.palette.text.secondary,
    minWidth: "unset",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.05),
    "& .MuiListItemText-primary": {
      color: theme.palette.text.primary,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    },
  },
  ...(isActive && {
    backgroundColor: alpha(theme.palette.primary.light, 0.08),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemText-primary": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  }),
}));

export const StyledList = styled(List)(() => ({
  display: "flex",
  padding: "24px 12px 0 12px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2px",
  flex: "1 0 0",
  alignSelf: "stretch",
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "16px 12px 6px 12px",
  userSelect: "none",
}));

export const StyledFooterList = styled(List)(({ theme }) => ({
  marginTop: "auto",
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "12px",
}));

export const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: "Mona Sans, sans-serif",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "150%",
}));
