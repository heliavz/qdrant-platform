import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import {
  Plus,
  Copy,
  Check,
  Trash2,
  AlertTriangle,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";

// Mock initial API keys
const generateMockKeys = (clusterName) => [
  {
    id: "key-1",
    name: "auto-generated-api-key",
    keyId: "83d54d4c-c368-46de-9c41-2d4d81cc706f",
    maskedKey: `********_7bU_a0w`,
    fullKey: `qdrant_pk_7bU_a0w_${clusterName}_xK9mP2qR`,
    status: "active",
    access: "Manage Cluster",
    createdBy: "heliavalizadeh@gmail.com",
    createdAt: "Apr 10, 2026",
    lastUsed: "2 hours ago",
    validUntil: null, // null = never expires
  },
];

// Status pill
const StatusPill = ({ status }) => {
  const map = {
    active: {
      label: "ACTIVE",
      color: "#26a69a",
      bg: "rgba(38,166,154,0.12)",
      border: "rgba(38,166,154,0.3)",
    },
    expired: {
      label: "EXPIRED",
      color: "#f44336",
      bg: "rgba(244,67,54,0.12)",
      border: "rgba(244,67,54,0.3)",
    },
    expiring: {
      label: "EXPIRING SOON",
      color: "#ffa726",
      bg: "rgba(255,167,38,0.12)",
      border: "rgba(255,167,38,0.3)",
    },
  };
  const s = map[status] ?? map.active;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: "10px",
        py: "3px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: s.color,
        bgcolor: s.bg,
        border: `1px solid ${s.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </Box>
  );
};

// Access badge
const AccessBadge = ({ access }) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      px: "10px",
      py: "3px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.04em",
      color: "primary.main",
      bgcolor: "rgba(148,148,255,0.1)",
      border: "1px solid rgba(148,148,255,0.3)",
      whiteSpace: "nowrap",
    }}
  >
    <Shield size={10} />
    {access.toUpperCase()}
  </Box>
);

// Copy button
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Tooltip title={copied ? "Copied!" : "Copy full key"} placement="top">
      <IconButton
        size="small"
        onClick={handleCopy}
        sx={{ color: copied ? "success.main" : "text.secondary" }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </IconButton>
    </Tooltip>
  );
};

// Masked key cell
const KeyCell = ({ apiKey }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <Typography
        sx={{
          fontSize: "13px",
          fontFamily: "monospace",
          color: "text.secondary",
          letterSpacing: "0.04em",
        }}
      >
        {revealed ? apiKey.fullKey : apiKey.maskedKey}
      </Typography>
      <Tooltip title={revealed ? "Hide key" : "Reveal key"} placement="top">
        <IconButton
          size="small"
          onClick={() => setRevealed((v) => !v)}
          sx={{ color: "text.secondary" }}
        >
          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
        </IconButton>
      </Tooltip>
      <CopyButton text={apiKey.fullKey} />
    </Box>
  );
};

// Last used cell
const LastUsedCell = ({ lastUsed }) => {
  if (!lastUsed) {
    return (
      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
        Never
      </Typography>
    );
  }

  // Color code based on recency
  const isStale = lastUsed.includes("month") || lastUsed.includes("year");
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Clock size={12} color={isStale ? "#ffa726" : "#94a3b8"} />
      <Typography
        sx={{
          fontSize: "13px",
          color: isStale ? "warning.main" : "text.secondary",
          fontWeight: isStale ? 500 : 400,
        }}
      >
        {lastUsed}
      </Typography>
      {isStale && (
        <Tooltip title="This key hasn't been used recently. Consider revoking it if no longer needed.">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "warning.main",
            }}
          >
            <AlertTriangle size={12} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

// Expiry cell
const ExpiryCell = ({ validUntil }) => {
  if (!validUntil) {
    return (
      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
        —
      </Typography>
    );
  }
  return (
    <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
      {validUntil}
    </Typography>
  );
};

// Create Key Modal
const CreateKeyModal = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [access, setAccess] = useState("manage_cluster");
  const [expiry, setExpiry] = useState("never");
  const [nameError, setNameError] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      setNameError("Please enter a key name.");
      return;
    }

    const accessLabels = {
      manage_cluster: "Manage Cluster",
      read_only: "Read Only",
      write_only: "Write Only",
    };

    const expiryLabels = {
      never: null,
      "30d": "May 17, 2026",
      "90d": "Jul 16, 2026",
      "1y": "Apr 17, 2027",
    };

    const newKey = {
      id: `key-${Date.now()}`,
      name: name.trim(),
      keyId: crypto.randomUUID?.() ?? `${Date.now()}-xxxx`,
      maskedKey: `********_${Math.random().toString(36).slice(2, 8)}`,
      fullKey: `qdrant_pk_${Math.random().toString(36).slice(2, 16)}`,
      status: "active",
      access: accessLabels[access],
      createdBy: "heliavalizadeh@gmail.com",
      createdAt: "Apr 17, 2026",
      lastUsed: null,
      validUntil: expiryLabels[expiry],
    };

    onCreate(newKey);
    setName("");
    setAccess("manage_cluster");
    setExpiry("never");
    setNameError("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setNameError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "background.paperElevation3",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "text.primary",
          pb: "8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            bgcolor: "rgba(148,148,255,0.1)",
            color: "primary.main",
          }}
        >
          <Key size={16} />
        </Box>
        Create API Key
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          pt: "16px !important",
        }}
      >
        {/* Key name */}
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "text.primary",
              mb: "6px",
            }}
          >
            Key Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. production-api-key"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            error={Boolean(nameError)}
            helperText={
              nameError ||
              "Give your key a descriptive name so you can identify it later."
            }
            FormHelperTextProps={{
              sx: {
                color: nameError ? "error.main" : "text.secondary",
                fontSize: "11px",
                mx: 0,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paperElevation2",
              },
            }}
          />
        </Box>

        {/* Access level */}
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "text.primary",
              mb: "6px",
            }}
          >
            Access Level
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              sx={{ bgcolor: "background.paperElevation2" }}
            >
              <MenuItem value="manage_cluster">
                <Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                    Manage Cluster
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "text.secondary" }}
                  >
                    Full read and write access to all collections and cluster
                    settings
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem value="read_only">
                <Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                    Read Only
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "text.secondary" }}
                  >
                    Can search and read data but cannot modify collections
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem value="write_only">
                <Box>
                  <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                    Write Only
                  </Typography>
                  <Typography
                    sx={{ fontSize: "11px", color: "text.secondary" }}
                  >
                    Can insert and update vectors but cannot read or search
                  </Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Expiry */}
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "text.primary",
              mb: "6px",
            }}
          >
            Expiry
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              sx={{ bgcolor: "background.paperElevation2" }}
            >
              <MenuItem value="never">Never expires</MenuItem>
              <MenuItem value="30d">30 days</MenuItem>
              <MenuItem value="90d">90 days</MenuItem>
              <MenuItem value="1y">1 year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Security tip */}
        <Alert
          severity="info"
          sx={{
            bgcolor: "rgba(41,182,246,0.08)",
            border: "1px solid rgba(41,182,246,0.2)",
            borderRadius: "8px",
            "& .MuiAlert-icon": { color: "info.main" },
          }}
        >
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
            The full key will only be shown once after creation. Store it
            securely — you won't be able to retrieve it again.
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: "24px", pb: "20px", gap: "8px" }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Key
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Column header
const ColHeader = ({ children }) => (
  <TableCell
    sx={{
      fontSize: "11px",
      fontWeight: 700,
      color: "text.secondary",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      bgcolor: "background.paperElevation2",
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      py: "10px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </TableCell>
);

// Main ApiKeysTab
const ApiKeysTab = ({ cluster }) => {
  const [keys, setKeys] = useState(generateMockKeys(cluster.name));
  const [createOpen, setCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleCreate = (newKey) => {
    setKeys((prev) => [...prev, newKey]);
  };

  const handleDelete = (id) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setDeletingId(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header card */}
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "16px 20px",
            "&:last-child": { pb: "16px" },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "text.primary",
                mb: "2px",
              }}
            >
              Manage API Keys to Access Your Database Cluster
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
              API keys authenticate requests to your cluster. Keep them secure
              and rotate regularly.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={15} />}
            onClick={() => setCreateOpen(true)}
            sx={{ flexShrink: 0, ml: "16px" }}
          >
            Create
          </Button>
        </CardContent>

        {/* Security tips */}
        {keys.some((k) => !k.lastUsed || k.lastUsed === "Never") && (
          <Box
            sx={{
              mx: "20px",
              mb: "16px",
              p: "10px 14px",
              borderRadius: "8px",
              bgcolor: "rgba(255,167,38,0.08)",
              border: "1px solid rgba(255,167,38,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertTriangle
              size={14}
              color="#ffa726"
              style={{ flexShrink: 0 }}
            />
            <Typography sx={{ fontSize: "12px", color: "warning.main" }}>
              You have keys that have never been used. Consider revoking unused
              keys to reduce security exposure.
            </Typography>
          </Box>
        )}

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <ColHeader>Name</ColHeader>
                <ColHeader>API Key</ColHeader>
                <ColHeader>Status</ColHeader>
                <ColHeader>Last Used</ColHeader>
                <ColHeader>Valid Until</ColHeader>
                <ColHeader>Access</ColHeader>
                <ColHeader>Created By</ColHeader>
                <ColHeader>Actions</ColHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((apiKey) => (
                <TableRow
                  key={apiKey.id}
                  sx={{
                    "&:last-child td": { borderBottom: "none" },
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  {/* Name */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      {apiKey.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "text.secondary",
                        fontFamily: "monospace",
                      }}
                    >
                      ID: {apiKey.keyId.slice(0, 20)}...
                    </Typography>
                  </TableCell>

                  {/* API Key */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <KeyCell apiKey={apiKey} />
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <StatusPill status={apiKey.status} />
                  </TableCell>

                  {/* Last Used — our improvement */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <LastUsedCell lastUsed={apiKey.lastUsed} />
                  </TableCell>

                  {/* Valid Until */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <ExpiryCell validUntil={apiKey.validUntil} />
                  </TableCell>

                  {/* Access */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <AccessBadge access={apiKey.access} />
                  </TableCell>

                  {/* Created By */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <Typography
                      sx={{ fontSize: "13px", color: "text.secondary" }}
                    >
                      {apiKey.createdBy}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={{ borderColor: "divider" }}>
                    <Tooltip title="Revoke key" placement="top">
                      <IconButton
                        size="small"
                        onClick={() => setDeletingId(apiKey.id)}
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "error.main",
                            bgcolor: "rgba(244,67,54,0.08)",
                          },
                        }}
                      >
                        <Trash2 size={15} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {keys.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    sx={{
                      textAlign: "center",
                      py: "40px",
                      borderBottom: "none",
                    }}
                  >
                    <Key
                      size={28}
                      color="#334155"
                      style={{ marginBottom: "8px" }}
                    />
                    <Typography
                      sx={{ fontSize: "14px", color: "text.secondary" }}
                    >
                      No API keys yet. Create one to access your cluster.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
            px: "20px",
            py: "10px",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
            Rows per page: 10
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
            1–{keys.length} of {keys.length}
          </Typography>
        </Box>
      </Card>

      {/* Create modal */}
      <CreateKeyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      {/* Confirm revoke dialog */}
      <Dialog
        open={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "background.paperElevation3",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{ fontSize: "1rem", fontWeight: 600, color: "text.primary" }}
        >
          Revoke API Key
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
            This key will be permanently revoked. Any applications using it will
            immediately lose access to the cluster. This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: "24px", pb: "20px", gap: "8px" }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => setDeletingId(null)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "error.main",
              color: "#fff",
              "&:hover": { bgcolor: "error.dark" },
            }}
            onClick={() => handleDelete(deletingId)}
          >
            Revoke Key
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApiKeysTab;
