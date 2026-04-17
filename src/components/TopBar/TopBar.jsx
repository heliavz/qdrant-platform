import React, { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
} from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  Monitor,
  Moon,
  Sun,
  Pencil,
  LogOut,
  Plus,
  Check,
  Search,
} from "lucide-react";
import { TriggerButton } from "../CommandPalette/CommandPaletteStyled";

// Account Switcher
const AccountSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const accounts = [
    {
      name: "Helia",
      role: "OWNER",
      description: "Default Account",
      active: true,
    },
  ];

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          px: "12px",
          py: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: open ? "action.hover" : "transparent",
          transition: "background 0.15s",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Avatar
          sx={{
            width: "22px",
            height: "22px",
            fontSize: "11px",
            fontWeight: 600,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          H
        </Avatar>
        <Typography
          variant="body2"
          sx={{ color: "text.primary", fontWeight: 500, fontSize: "0.875rem" }}
        >
          Helia
        </Typography>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: "6px",
            minWidth: "220px",
            bgcolor: "background.paperElevation3",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Box sx={{ px: "12px", py: "10px" }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              fontSize: "12px",
              mb: "8px",
            }}
          >
            My Accounts
          </Typography>
          {accounts.map((account) => (
            <Box
              key={account.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: "10px",
                py: "8px",
                borderRadius: "8px",
                bgcolor: account.active ? "action.selected" : "transparent",
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    {account.name}
                  </Typography>
                  <Box
                    sx={{
                      px: "6px",
                      py: "1px",
                      borderRadius: "4px",
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      color: "primary.main",
                      fontSize: "10px",
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    {account.role}
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "12px" }}
                >
                  {account.description}
                </Typography>
              </Box>
              {account.active && <Check size={16} color="#9494ff" />}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: "4px" }} />

        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            mx: "8px",
            mb: "6px",
            borderRadius: "8px",
            gap: "8px",
            color: "primary.main",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          <Plus size={16} />
          Create a new Account
        </MenuItem>
      </Menu>
    </>
  );
};

// User Profile
const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [theme, setTheme] = useState("system");
  const open = Boolean(anchorEl);

  const handleThemeChange = (_, newTheme) => {
    if (newTheme !== null) setTheme(newTheme);
  };

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          px: "12px",
          py: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.15s",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.primary", fontWeight: 500 }}
        >
          Helia Valizadeh
        </Typography>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: "6px",
            minWidth: "260px",
            bgcolor: "background.paperElevation3",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Box
          sx={{
            px: "16px",
            py: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Helia Valizadeh
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "12px" }}
            >
              heliavalizadeh@gmail.com
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Box
              sx={{
                px: "8px",
                py: "2px",
                borderRadius: "4px",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                color: "text.secondary",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Google
            </Box>
            <Tooltip title="Edit profile">
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <Pencil size={14} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: "16px", py: "12px" }}>
          <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={handleThemeChange}
            fullWidth
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                border: (t) => `1px solid ${t.palette.divider}`,
                color: "text.secondary",
                py: "8px",
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  color: "text.primary",
                  borderColor: "primary.main",
                },
                "&:hover": { bgcolor: "action.hover" },
              },
            }}
          >
            <ToggleButton value="system">
              <Monitor size={16} />
            </ToggleButton>
            <ToggleButton value="dark">
              <Moon size={16} />
            </ToggleButton>
            <ToggleButton value="light">
              <Sun size={16} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => setAnchorEl(null)}
          sx={{
            mx: "8px",
            my: "6px",
            borderRadius: "8px",
            gap: "8px",
            color: "text.secondary",
            fontSize: "0.875rem",
            "&:hover": { color: "text.primary" },
          }}
        >
          <LogOut size={16} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

// TopBar
const TopBar = ({ onSearchOpen }) => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: "28px",
        pr: "28px",
        height: "61px",
        flexShrink: 0,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paperElevation1",
      }}
    >
      {/* Left: account switcher */}
      <AccountSwitcher />

      {/* Center: search trigger */}
      <TriggerButton onClick={onSearchOpen}>
        <Search size={14} color="#94a3b8" />
        <Typography
          sx={{
            fontSize: "13px",
            color: "text.secondary",
            fontWeight: 400,
            minWidth: "140px",
          }}
        >
          Search...
        </Typography>
        <Box sx={{ display: "flex", gap: "3px", ml: "8px" }}>
          {["Ctrl", "K"].map((k) => (
            <Box
              key={k}
              sx={{
                px: "5px",
                py: "1px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                fontFamily: "monospace",
                color: "text.secondary",
                bgcolor: "action.hover",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                lineHeight: 1.6,
              }}
            >
              {k}
            </Box>
          ))}
        </Box>
      </TriggerButton>

      {/* Right: user profile */}
      <UserProfile />
    </Box>
  );
};

export default TopBar;
