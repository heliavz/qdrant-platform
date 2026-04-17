import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  TrendingUp,
  Terminal,
  Circle,
  Database,
  Lock,
  FlaskConical,
  BookOpen,
  Check,
} from "lucide-react";
import ClusterStatusBar from "../../components/ClusterStatus/ClusterStatusBar";

// Tab panel
const TabPanel = ({ children, value, index }) => (
  <Box hidden={value !== index} sx={{ pt: "24px" }}>
    {value === index && children}
  </Box>
);

// Copy field
const CopyField = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Typography
        sx={{ fontSize: "12px", color: "text.secondary", fontWeight: 500 }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          bgcolor: "background.paperElevation2",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          px: "12px",
          py: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            fontFamily: "monospace",
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </Typography>
        <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ color: "text.secondary", flexShrink: 0 }}
          >
            {copied ? <Check size={14} color="#26a69a" /> : <Copy size={14} />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

// Quick action card
const QuickAction = ({ icon: Icon, title, description }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      py: "12px",
      cursor: "pointer",
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      "&:last-child": { borderBottom: "none" },
      "&:hover .action-title": { color: "primary.main" },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          bgcolor: "action.hover",
          color: "primary.main",
          flexShrink: 0,
        }}
      >
        <Icon size={16} />
      </Box>
      <Box>
        <Typography
          className="action-title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "text.primary",
            transition: "color 0.15s",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
    </Box>
    <ExternalLink size={14} color="#94a3b8" />
  </Box>
);

// Overview tab content
const OverviewTab = ({ cluster }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: "24px",
      alignItems: "start",
    }}
  >
    {/* Left column */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Cluster info card */}
      <Card>
        <CardContent sx={{ p: "20px", "&:last-child": { pb: "20px" } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              mb: "20px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", mb: "4px" }}
              >
                Cluster ID
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "text.primary",
                    fontFamily: "monospace",
                  }}
                >
                  {cluster.clusterId?.slice(0, 8)}...
                </Typography>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Copy size={12} />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", mb: "4px" }}
              >
                Version
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                v{cluster.version}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", mb: "4px" }}
              >
                Cloud Provider
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Box
                  sx={{
                    px: "6px",
                    py: "1px",
                    borderRadius: "4px",
                    bgcolor: "rgba(255,153,0,0.1)",
                    border: "1px solid rgba(255,153,0,0.2)",
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#ff9900",
                  }}
                >
                  {cluster.provider.toUpperCase()}
                </Box>
                <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
                  {cluster.region.split("—")[0].trim()}
                </Typography>
              </Box>
            </Box>
          </Box>

          <CopyField label="Endpoint" value={cluster.endpoint} />

          <Divider sx={{ my: "16px" }} />

          {/* Node metrics table */}
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1fr 1fr 1fr 0.5fr",
                gap: "12px",
                pb: "8px",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                mb: "12px",
              }}
            >
              {["NODE", "DISK", "RAM", "VCPU", "ACTIONS"].map((col) => (
                <Typography
                  key={col}
                  sx={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {col}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1fr 1fr 1fr 0.5fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                >
                  #0
                </Typography>
                <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                  v{cluster.version}
                </Typography>
              </Box>
              {[
                {
                  used: cluster.disk.used,
                  total: cluster.disk.used < 100 ? 4096 : cluster.disk.total,
                  unit: "KiB/GiB",
                },
                {
                  used: cluster.ram.used,
                  total: cluster.ram.total,
                  unit: "MiB/GiB",
                },
                {
                  used: cluster.cpu.used,
                  total: cluster.cpu.total,
                  unit: "vCPUs",
                },
              ].map((metric, i) => (
                <Box key={i}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "text.secondary",
                      mb: "4px",
                    }}
                  >
                    {i === 2
                      ? `${metric.used} of ${metric.total} ${metric.unit}`
                      : `${metric.used} ${metric.unit.split("/")[0]} of ${i === 0 ? "4.00" : (metric.total / 1024).toFixed(2)} ${metric.unit.split("/")[1]}`}
                  </Typography>
                  <Box
                    sx={{
                      height: "4px",
                      borderRadius: "2px",
                      bgcolor: "action.hover",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        borderRadius: "2px",
                        bgcolor: "primary.main",
                        width: `${Math.min((metric.used / metric.total) * 100, 100)}%`,
                      }}
                    />
                  </Box>
                </Box>
              ))}
              <Box>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Copy size={14} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Upgrade banner */}
      <Card
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.background.paperElevation3} 0%, ${theme.palette.background.paperElevation2} 100%)`,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "20px",
            "&:last-child": { pb: "20px" },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "text.primary",
                mb: "4px",
              }}
            >
              Upgrade to Get All Qdrant Cloud Features
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
                maxWidth: "480px",
              }}
            >
              Get dedicated resources, backups, disaster recovery, advanced
              scaling, monitoring, log management, enterprise support, and a
              99.5% uptime guarantee.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ flexShrink: 0, ml: "16px" }}
          >
            Upgrade to a Paid Cluster
          </Button>
        </CardContent>
      </Card>

      {/* Get started with data */}
      <Card>
        <CardContent sx={{ p: "20px", "&:last-child": { pb: "20px" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "12px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "text.primary",
                  mb: "4px",
                }}
              >
                Get Started With Your Data
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
                Create a new collection to start storing vectors and metadata.
                Or migrate existing data using our Migration Tool from sources
                like:
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", gap: "8px", flexShrink: 0, ml: "16px" }}
            >
              <Button variant="contained" color="primary" size="small">
                Create Collection
              </Button>
              <Button variant="outlined" color="inherit" size="small">
                Migrate Your Data
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", gap: "8px", flexWrap: "wrap", mt: "8px" }}
          >
            {[
              "Other Qdrant Instances",
              "Pinecone",
              "Elastic",
              "MongoDB",
              "And more",
            ].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: "12px",
                  height: "24px",
                  bgcolor: "action.hover",
                  color: "text.secondary",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>

    {/* Right column */}
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Access the cluster */}
      <Card>
        <CardContent sx={{ p: "20px", "&:last-child": { pb: "20px" } }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "text.primary",
              mb: "4px",
            }}
          >
            Access the Cluster
          </Typography>
          <QuickAction
            icon={Database}
            title="Manage Collections"
            description="Create and view collections."
          />
          <QuickAction
            icon={Lock}
            title="Access Cluster"
            description="Start working with your data."
          />
          <QuickAction
            icon={FlaskConical}
            title="Try Sample Datasets"
            description="Explore ready-made datasets."
          />
          <QuickAction
            icon={BookOpen}
            title="Explore Tutorials"
            description="Learn Qdrant with interactive examples."
          />
        </CardContent>
      </Card>

      {/* Use the API */}
      <Card>
        <CardContent sx={{ p: "20px", "&:last-child": { pb: "20px" } }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "text.primary",
              mb: "12px",
            }}
          >
            Use the API
          </Typography>
          <Typography
            sx={{ fontSize: "13px", color: "text.secondary", mb: "12px" }}
          >
            Use the Qdrant API to add, query, and manage vector data
            effortlessly.
          </Typography>
          <CopyField label="Endpoint" value={cluster.endpoint} />
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            sx={{ mt: "12px" }}
          >
            Examples
          </Button>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

// Main ClusterDetail
const clusterTabs = [
  "Overview",
  "API Keys",
  "Metrics",
  "Logs",
  "Backups",
  "Configuration",
  "Inference",
];

const ClusterDetail = ({ cluster, onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "28px",
        py: "28px",
        width: "100%",
      }}
    >
      {/* Back button */}
      <Button
        startIcon={<ArrowLeft size={15} />}
        onClick={onBack}
        color="inherit"
        sx={{
          alignSelf: "flex-start",
          color: "text.secondary",
          mb: "16px",
          fontSize: "13px",
          px: 0,
          "&:hover": { color: "text.primary", bgcolor: "transparent" },
        }}
      >
        All Clusters
      </Button>

      {/* Cluster header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Typography
            sx={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            {cluster.name}
          </Typography>
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
              color: "#26a69a",
              bgcolor: "rgba(38,166,154,0.12)",
              border: "1px solid rgba(38,166,154,0.3)",
            }}
          >
            <Circle size={6} fill="#26a69a" color="#26a69a" />
            {cluster.status}
          </Box>
          <Chip
            label="FREE TIER"
            size="small"
            sx={{
              fontSize: "10px",
              height: "22px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              bgcolor: "rgba(148,148,255,0.1)",
              color: "primary.main",
              border: "1px solid rgba(148,148,255,0.3)",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<TrendingUp size={14} />}
            size="small"
          >
            Scale Cluster
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Terminal size={14} />}
            size="small"
          >
            Cluster UI
          </Button>
        </Box>
      </Box>

      {/* IMPROVEMENT: Status bar right here, above the tabs */}
      <ClusterStatusBar cluster={cluster} />

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          mb: "0",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            minHeight: "44px",
            "& .MuiTabs-indicator": { bgcolor: "primary.main" },
            "& .MuiTab-root": {
              minHeight: "44px",
              py: "8px",
              fontSize: "0.875rem",
            },
            "& .MuiTab-root.Mui-selected": { color: "text.primary" },
          }}
        >
          {clusterTabs.map((tab, i) => (
            <Tab key={tab} label={tab} id={`detail-tab-${i}`} />
          ))}
        </Tabs>
      </Box>

      {/* Tab content */}
      <TabPanel value={activeTab} index={0}>
        <OverviewTab cluster={cluster} />
      </TabPanel>

      {clusterTabs.slice(1).map((tab, i) => (
        <TabPanel key={tab} value={activeTab} index={i + 1}>
          <Box sx={{ py: "40px", textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              {tab} — coming soon
            </Typography>
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
};

export default ClusterDetail;
