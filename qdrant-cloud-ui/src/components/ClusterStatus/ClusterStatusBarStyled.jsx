import { styled, alpha } from "@mui/material/styles";
import { Box, LinearProgress } from "@mui/material";

export const StatusBarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  padding: "10px 16px",
  borderRadius: "10px",
  border: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paperElevation2,
  marginBottom: "16px",
  flexWrap: "wrap",
}));

export const MetricBlock = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  minWidth: "120px",
  flex: "1 1 120px",
}));

export const MetricLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  color: theme.palette.text.secondary,
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

export const MetricValue = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "12px",
  fontWeight: 600,
}));

export const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => {
  const colorMap = {
    healthy: theme.palette.success.main,
    warning: theme.palette.warning.main,
    critical: theme.palette.error.main,
  };
  const color = colorMap[status] ?? theme.palette.primary.main;

  return {
    height: "4px",
    borderRadius: "2px",
    backgroundColor: alpha(color, 0.15),
    "& .MuiLinearProgress-bar": {
      borderRadius: "2px",
      backgroundColor: color,
    },
  };
});

export const StatusPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "status",
})(({ theme, status }) => {
  const colorMap = {
    healthy: {
      bg: alpha(theme.palette.success.main, 0.12),
      color: theme.palette.success.main,
      border: alpha(theme.palette.success.main, 0.3),
    },
    warning: {
      bg: alpha(theme.palette.warning.main, 0.12),
      color: theme.palette.warning.main,
      border: alpha(theme.palette.warning.main, 0.3),
    },
    critical: {
      bg: alpha(theme.palette.error.main, 0.12),
      color: theme.palette.error.main,
      border: alpha(theme.palette.error.main, 0.3),
    },
  };

  const style = colorMap[status] ?? colorMap.healthy;

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 600,
    background: style.bg,
    color: style.color,
    border: `1px solid ${style.border}`,
    whiteSpace: "nowrap",
  };
});

export const DividerLine = styled(Box)(({ theme }) => ({
  width: "1px",
  height: "36px",
  background: theme.palette.divider,
  flexShrink: 0,
}));
