import React from "react";
import { Box, Typography, Card, Button, Chip } from "@mui/material";
import { Plus, ExternalLink, MoreHorizontal, Circle } from "lucide-react";

// Status pill
const StatusPill = ({ status }) => {
  const colorMap = {
    healthy: {
      color: "#26a69a",
      bg: "rgba(38,166,154,0.12)",
      border: "rgba(38,166,154,0.3)",
    },
    warning: {
      color: "#ffa726",
      bg: "rgba(255,167,38,0.12)",
      border: "rgba(255,167,38,0.3)",
    },
    critical: {
      color: "#f44336",
      bg: "rgba(244,67,54,0.12)",
      border: "rgba(244,67,54,0.3)",
    },
  };
  const s = colorMap[status] ?? colorMap.healthy;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        px: "10px",
        py: "3px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: s.color,
        bgcolor: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      <Circle size={6} fill={s.color} color={s.color} />
      {status}
    </Box>
  );
};

// Column header
const ColHeader = ({ children }) => (
  <Typography
    sx={{
      fontSize: "11px",
      fontWeight: 700,
      color: "text.disabled",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    {children}
  </Typography>
);

// Spec item inside Configuration column
const SpecItem = ({ icon, label }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
      {icon}
    </Typography>
    <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
      {label}
    </Typography>
  </Box>
);

// Cluster row
const ClusterRow = ({ cluster, onSelect, isLast }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.5fr",
      alignItems: "center",
      gap: "16px",
      px: "20px",
      py: "20px",
      borderBottom: isLast
        ? "none"
        : (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
    {/* Cluster name */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <Chip
        label="FREE TIER"
        size="small"
        sx={{
          fontSize: "10px",
          height: "18px",
          width: "fit-content",
          fontWeight: 700,
          letterSpacing: "0.04em",
          bgcolor: "rgba(148,148,255,0.1)",
          color: "primary.main",
          border: "1px solid rgba(148,148,255,0.3)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          width: "fit-content",
          "&:hover .cluster-name": { color: "primary.main" },
        }}
        onClick={() => onSelect(cluster)}
      >
        <Typography
          className="cluster-name"
          sx={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "text.primary",
            transition: "color 0.15s",
          }}
        >
          {cluster.name}
        </Typography>
        <ExternalLink size={13} color="#94a3b8" />
      </Box>
      <Typography
        sx={{ fontSize: "12px", color: "primary.main", cursor: "pointer" }}
      >
        Upgrade to a Paid Cluster
      </Typography>
    </Box>

    {/* Configuration */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <SpecItem icon="⬡" label={`${cluster.nodes} NODE`} />
      <SpecItem
        icon="💾"
        label={`Disk: ${cluster.disk.used < 100 ? "4GiB" : cluster.disk.total + " GiB"}`}
      />
      <SpecItem
        icon="🖥"
        label={`RAM: ${cluster.ram.total >= 1024 ? "1GiB" : cluster.ram.total + "MB"}`}
      />
      <SpecItem icon="⚙" label={`vCPUs: ${cluster.cpu.total}`} />
    </Box>

    {/* Provider */}
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Box
        sx={{
          px: "6px",
          py: "2px",
          borderRadius: "4px",
          bgcolor: "rgba(255,153,0,0.1)",
          border: "1px solid rgba(255,153,0,0.2)",
          fontSize: "10px",
          fontWeight: 800,
          color: "#ff9900",
          letterSpacing: "0.02em",
        }}
      >
        {cluster.provider.toUpperCase()}
      </Box>
      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
        {cluster.region.split("—")[0].trim()}
      </Typography>
    </Box>

    {/* Status */}
    <Box>
      <StatusPill status={cluster.status} />
    </Box>

    {/* Actions */}
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          cursor: "pointer",
          color: "text.secondary",
          "&:hover": { bgcolor: "action.hover", color: "text.primary" },
        }}
      >
        <MoreHorizontal size={18} />
      </Box>
    </Box>
  </Box>
);

// Main ClusterList
const ClusterList = ({ clusters, onSelect, onCreateNew }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "28px",
        py: "32px",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "32px",
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.5px",
          }}
        >
          Clusters
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={onCreateNew}
          sx={{ py: "8px", px: "20px" }}
        >
          Create
        </Button>
      </Box>

      {/* Table */}
      <Card sx={{ overflow: "hidden" }}>
        {/* Table header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 1fr 0.8fr 0.5fr",
            gap: "16px",
            px: "20px",
            py: "12px",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paperElevation2",
          }}
        >
          <ColHeader>Cluster</ColHeader>
          <ColHeader>Configuration</ColHeader>
          <ColHeader>Provider</ColHeader>
          <ColHeader>Status</ColHeader>
          <ColHeader>Actions</ColHeader>
        </Box>

        {/* Cluster rows */}
        {clusters.map((cluster, index) => (
          <ClusterRow
            key={cluster.id}
            cluster={cluster}
            onSelect={onSelect}
            isLast={index === clusters.length - 1}
          />
        ))}
      </Card>
    </Box>
  );
};

export default ClusterList;
