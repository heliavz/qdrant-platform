import React from "react";
import qdrantLogo from "../../assets/qdrant-logo-dark.svg";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Rocket,
  Server,
  Cloud,
  HardDrive,
  ShieldCheck,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  Drawer,
  StyledList,
  StyledListItemButton,
  SectionLabel,
  StyledFooterList,
  FooterText,
} from "./SidebarStyled";

const dashboardItems = [
  { label: "Get Started", icon: Rocket, id: "get-started" },
  { label: "Clusters", icon: Server, id: "clusters" },
  { label: "Hybrid Cloud", icon: Cloud, id: "hybrid-cloud" },
  { label: "Backups", icon: HardDrive, id: "backups" },
];

const accountItems = [
  { label: "Access Management", icon: ShieldCheck, id: "access-management" },
  { label: "Billing", icon: CreditCard, id: "billing" },
  { label: "Settings", icon: Settings, id: "settings" },
];

const NavItem = ({ item, activeItem, onSelect }) => {
  const isActive = activeItem === item.id;
  const Icon = item.icon;

  return (
    <ListItem disablePadding sx={{ width: "100%" }}>
      <StyledListItemButton
        isActive={isActive}
        onClick={() => onSelect(item.id)}
      >
        <ListItemIcon>
          <Icon size={18} />
        </ListItemIcon>
        <ListItemText primary={item.label} />
      </StyledListItemButton>
    </ListItem>
  );
};

const Sidebar = ({ activeItem, onSelect }) => {
  return (
    <Drawer variant="permanent" anchor="left">
      {/* Logo */}
      <Box
        onClick={() => onSelect("get-started")}
        sx={{
          display: "flex",
          alignItems: "center",
          px: "20px",
          py: "18px",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={qdrantLogo}
          alt="Qdrant"
          sx={{ height: "28px", objectFit: "contain" }}
        />
      </Box>

      <Divider />

      {/* Dashboard section */}
      <StyledList>
        <SectionLabel>Dashboard</SectionLabel>
        {dashboardItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeItem={activeItem}
            onSelect={onSelect}
          />
        ))}

        <SectionLabel sx={{ mt: "8px" }}>Account</SectionLabel>
        {accountItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            activeItem={activeItem}
            onSelect={onSelect}
          />
        ))}
      </StyledList>

      {/* Footer */}
      <StyledFooterList>
        <ListItem disablePadding>
          <StyledListItemButton onClick={() => onSelect("support")}>
            <ListItemIcon>
              <HelpCircle size={18} />
            </ListItemIcon>
            <ListItemText primary="Get Support" />
          </StyledListItemButton>
        </ListItem>
        <ListItem sx={{ px: "12px", pt: "12px" }}>
          <FooterText>Helia Valizadeh</FooterText>
        </ListItem>
      </StyledFooterList>
    </Drawer>
  );
};

export default Sidebar;
