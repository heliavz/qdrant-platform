import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { Activity, Circle } from "lucide-react";
import {
  StatusBarWrapper,
  MetricBlock,
  MetricLabel,
  MetricValue,
  StyledLinearProgress,
  StatusPill,
  DividerLine,
} from "./ClusterStatusBarStyled";

const getStatus = (percent) => {
  if (percent >= 90) return "critical";
  if (percent >= 70) return "warning";
  return "healthy";
};

const statusLabel = {
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
};

// Individual metric block with label, bar, and value
const Metric = ({ label, used, total, unit = "MB" }) => {
  const percent = Math.round((used / total) * 100);
  const status = getStatus(percent);

  return (
    <MetricBlock>
      <MetricLabel>
        <span>{label}</span>
        <MetricValue>
          {used}
          <Typography
            component="span"
            sx={{ color: "text.secondary", fontSize: "11px", fontWeight: 400 }}
          >
            /{total} {unit}
          </Typography>
        </MetricValue>
      </MetricLabel>
      <Tooltip title={`${percent}% used`} placement="top" arrow>
        <StyledLinearProgress
          variant="determinate"
          value={percent}
          status={status}
        />
      </Tooltip>
    </MetricBlock>
  );
};

// ClusterStatusBar — accepts a cluster object with metrics
const ClusterStatusBar = ({ cluster }) => {
  const overallStatus = [
    getStatus((cluster.ram.used / cluster.ram.total) * 100),
    getStatus((cluster.cpu.used / cluster.cpu.total) * 100),
    getStatus((cluster.disk.used / cluster.disk.total) * 100),
  ].reduce((worst, current) => {
    const priority = { critical: 3, warning: 2, healthy: 1 };
    return priority[current] > priority[worst] ? current : worst;
  }, "healthy");

  return (
    <StatusBarWrapper>
      {/* Status pill */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Status
        </Typography>
        <StatusPill status={overallStatus}>
          <Circle size={6} fill="currentColor" />
          {statusLabel[overallStatus]}
        </StatusPill>
      </Box>

      <DividerLine />

      {/* Version */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Version
        </Typography>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            px: "8px",
            py: "2px",
            borderRadius: "20px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            fontSize: "11px",
            fontWeight: 600,
            color: "text.secondary",
            whiteSpace: "nowrap",
          }}
        >
          <Activity size={10} />v{cluster.version}
        </Box>
      </Box>

      <DividerLine />

      {/* RAM */}
      <Metric
        label="RAM"
        used={cluster.ram.used}
        total={cluster.ram.total}
        unit="MB"
      />

      {/* CPU */}
      <Metric
        label="CPU"
        used={cluster.cpu.used}
        total={cluster.cpu.total}
        unit="cores"
      />

      {/* Disk */}
      <Metric
        label="Disk"
        used={cluster.disk.used}
        total={cluster.disk.total}
        unit="GB"
      />

      <DividerLine />

      {/* Collections count */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Collections
        </Typography>
        <Typography
          sx={{ fontSize: "13px", fontWeight: 600, color: "text.primary" }}
        >
          {cluster.collections}
        </Typography>
      </Box>

      {/* Region */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexShrink: 0,
          ml: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "11px",
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Region
        </Typography>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, color: "text.secondary" }}
        >
          {cluster.region}
        </Typography>
      </Box>
    </StatusBarWrapper>
  );
};

export default ClusterStatusBar;
