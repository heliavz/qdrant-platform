import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Divider,
} from "@mui/material";
import { Package, Rocket, Check, Server } from "lucide-react";

// Mock data
const cloudProviders = [
  { value: "aws", label: "Amazon Web Services" },
  { value: "gcp", label: "Google Cloud Platform" },
];

const regions = {
  aws: [
    { value: "eu-west-1", label: "EU West 1 — Ireland" },
    { value: "eu-central-1", label: "EU Central 1 — Frankfurt" },
    { value: "us-east-1", label: "US East 1 — N. Virginia" },
    { value: "us-west-2", label: "US West 2 — Oregon" },
    { value: "ap-southeast-1", label: "AP Southeast 1 — Singapore" },
    { value: "sa-east-1", label: "SA East 1 — São Paulo" },
  ],
  gcp: [
    { value: "us-central1", label: "US Central 1 — Iowa" },
    { value: "europe-west1", label: "Europe West 1 — Belgium" },
    { value: "asia-east1", label: "Asia East 1 — Taiwan" },
  ],
};

const dedicatedFeatures = [
  "High Availability with Unlimited Lifetime",
  "Standard Support & 99.5% Uptime SLA",
  "Horizontal & Vertical Scaling",
  "Backup and Disaster Recovery",
  "Inference in Cloud",
];

// Spec pill
const SpecPill = ({ label, value }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <Server size={14} color="#60a5fa" />
      <Typography
        sx={{ fontSize: "12px", color: "text.secondary", fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Box>
    <Typography
      sx={{ fontSize: "13px", color: "text.primary", fontWeight: 600 }}
    >
      {value}
    </Typography>
  </Box>
);

// Free Cluster Card
const FreeClusterCard = ({ onCreate }) => {
  const [clusterName, setClusterName] = useState("");
  const [provider, setProvider] = useState("aws");
  const [region, setRegion] = useState("sa-east-1");
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const val = e.target.value;
    setClusterName(val);
    if (val && !/^[a-zA-Z0-9_-]+$/.test(val)) {
      setNameError(
        "Can only contain alphanumeric characters, hyphens and underscores.",
      );
    } else {
      setNameError("");
    }
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    setRegion(regions[e.target.value][0].value);
  };

  const handleCreate = () => {
    if (!clusterName) {
      setNameError("Please enter a cluster name.");
      return;
    }
    if (nameError) return;

    const newCluster = {
      id: `cluster-${Date.now()}`,
      name: clusterName,
      tier: "Free",
      version: "1.17.1",
      provider,
      region:
        regions[provider].find((r) => r.value === region)?.label ?? region,
      nodes: 1,
      collections: 0,
      status: "healthy",
      created: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      ram: { used: 119, total: 1024, unit: "MB" },
      cpu: { used: 0.04, total: 0.5, unit: "vCPUs" },
      disk: { used: 52, total: 4096, unit: "GiB" },
      endpoint: `https://${clusterName}.${region}.aws.cloud.qdrant.io`,
      clusterId: `${Date.now().toString(16)}-xxxx-4xxx-yxxx-xxxxxxxxxxxx`,
    };

    onCreate(newCluster);
  };

  return (
    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: "28px",
          "&:last-child": { pb: "28px" },
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            bgcolor: "rgba(59, 130, 246, 0.1)",
          }}
        >
          <Package size={24} color="#60a5fa" />
        </Box>

        <Typography
          variant="h5"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Create a Free Cluster
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}
          >
            Cluster Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter a Cluster name"
            value={clusterName}
            onChange={handleNameChange}
            error={Boolean(nameError)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paperElevation2",
                fontSize: "14px",
              },
            }}
          />
          <FormHelperText
            sx={{
              mx: 0,
              color: nameError ? "error.main" : "text.secondary",
              fontSize: "11px",
            }}
          >
            {nameError ||
              "Can only contain alphanumeric characters, hyphens and underscores."}
          </FormHelperText>
        </Box>

        <Box sx={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Nodes", value: "1" },
            { label: "Disk", value: "4GiB" },
            { label: "RAM", value: "1GiB" },
            { label: "vCPUs", value: "0.5" },
          ].map((spec) => (
            <SpecPill key={spec.label} {...spec} />
          ))}
        </Box>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}
          >
            Select Cloud Provider and Region
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <FormControl size="small" sx={{ flex: 1 }}>
              <Select
                value={provider}
                onChange={handleProviderChange}
                sx={{ bgcolor: "background.paperElevation2", fontSize: "14px" }}
              >
                {cloudProviders.map((p) => (
                  <MenuItem key={p.value} value={p.value}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {p.value.toUpperCase()}
                      </Typography>
                      <Typography sx={{ fontSize: "13px" }}>
                        {p.label}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: 1 }}>
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                sx={{ bgcolor: "background.paperElevation2", fontSize: "14px" }}
              >
                {(regions[provider] || []).map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    <Typography sx={{ fontSize: "13px" }}>{r.label}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreate}
            sx={{ py: "10px", fontSize: "0.9375rem" }}
          >
            Create Free Cluster
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Dedicated Cluster Card
const DedicatedClusterCard = () => (
  <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        p: "28px",
        "&:last-child": { pb: "28px" },
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          bgcolor: "rgba(148, 148, 255, 0.1)",
        }}
      >
        <Rocket size={24} color="#9494ff" />
      </Box>

      <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600 }}>
        Create a Dedicated Cluster
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mt: "-8px" }}>
        A production-ready cluster with:
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {dedicatedFeatures.map((feature) => (
          <Box
            key={feature}
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                bgcolor: "rgba(148, 148, 255, 0.1)",
                flexShrink: 0,
              }}
            >
              <Check size={12} color="#9494ff" />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontSize: "0.9375rem" }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: "10px", fontSize: "0.9375rem" }}
        >
          Create Dedicated Cluster
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// Main Page
const Clusters = ({ onCreate }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        px: "40px",
        py: "60px",
        width: "100%",
      }}
    >
      <Box sx={{ textAlign: "center", mb: "40px" }}>
        <Typography
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.5px",
            mb: "8px",
          }}
        >
          Welcome to Qdrant Cloud
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Create your first cluster to get started
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "24px",
          width: "100%",
          maxWidth: "900px",
          alignItems: "stretch",
        }}
      >
        <FreeClusterCard onCreate={onCreate} />
        <DedicatedClusterCard />
      </Box>
    </Box>
  );
};

export default Clusters;
