import React, { useState, useEffect, useRef, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import {
  Search,
  Rocket,
  Server,
  Cloud,
  HardDrive,
  ShieldCheck,
  CreditCard,
  Settings,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  BookOpen,
  MessageCircle,
  FileCode,
  Zap,
} from "lucide-react";
import {
  Backdrop,
  PaletteContainer,
  SearchRow,
  ResultsList,
  GroupLabel,
  ResultItem,
  ResultIcon,
  KbdBadge,
} from "./CommandPaletteStyled";

// All searchable items
const buildItems = (clusters = []) => [
  {
    group: "Pages",
    items: [
      {
        id: "get-started",
        label: "Get Started",
        description: "Overview and quickstart guides",
        icon: Rocket,
        type: "page",
      },
      {
        id: "clusters",
        label: "Clusters",
        description: "Manage your Qdrant clusters",
        icon: Server,
        type: "page",
      },
      {
        id: "hybrid-cloud",
        label: "Hybrid Cloud",
        description: "Bring your own infrastructure",
        icon: Cloud,
        type: "page",
      },
      {
        id: "backups",
        label: "Backups",
        description: "Cluster snapshots and recovery",
        icon: HardDrive,
        type: "page",
      },
      {
        id: "access-management",
        label: "Access Management",
        description: "API keys and permissions",
        icon: ShieldCheck,
        type: "page",
      },
      {
        id: "billing",
        label: "Billing",
        description: "Plans and payment methods",
        icon: CreditCard,
        type: "page",
      },
      {
        id: "settings",
        label: "Settings",
        description: "Account and platform settings",
        icon: Settings,
        type: "page",
      },
      {
        id: "support",
        label: "Get Support",
        description: "Contact support team",
        icon: HelpCircle,
        type: "page",
      },
    ],
  },
  ...(clusters.length > 0
    ? [
        {
          group: "Clusters",
          items: clusters.map((c) => ({
            id: `cluster-${c.id}`,
            label: c.name,
            description: `${c.region.split("—")[0].trim()} · ${c.tier} · ${c.status}`,
            icon: Server,
            type: "cluster",
            cluster: c,
          })),
        },
      ]
    : []),
  {
    group: "Quick Actions",
    items: [
      {
        id: "action-create-cluster",
        label: "Create a new cluster",
        description: "Spin up a free or dedicated cluster",
        icon: Zap,
        type: "action",
      },
      {
        id: "action-api-docs",
        label: "Open API Reference",
        description: "api.qdrant.tech",
        icon: FileCode,
        type: "external",
        href: "https://api.qdrant.tech/",
      },
      {
        id: "action-discord",
        label: "Join Discord Community",
        description: "7,000+ members",
        icon: MessageCircle,
        type: "external",
        href: "https://qdrant.to/discord",
      },
    ],
  },
  {
    group: "Documentation",
    items: [
      {
        id: "doc-quickstart",
        label: "Cloud Quickstart",
        description: "Get up and running in minutes",
        icon: BookOpen,
        type: "external",
        href: "https://qdrant.tech/documentation/quickstart-cloud/",
      },
      {
        id: "doc-collections",
        label: "Collections Guide",
        description: "Learn how to create and manage collections",
        icon: BookOpen,
        type: "external",
        href: "https://qdrant.tech/documentation/concepts/collections/",
      },
      {
        id: "doc-search",
        label: "Vector Search Concepts",
        description: "Understand how search works",
        icon: BookOpen,
        type: "external",
        href: "https://qdrant.tech/documentation/concepts/search/",
      },
      {
        id: "doc-api-keys",
        label: "API Keys Documentation",
        description: "Manage authentication and access",
        icon: BookOpen,
        type: "external",
        href: "https://qdrant.tech/documentation/cloud/authentication/",
      },
    ],
  },
];

// Highlight matching characters
const HighlightMatch = ({ text, query }) => {
  if (!query) {
    return <span>{text}</span>;
  }
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return <span>{text}</span>;

  return (
    <span>
      {text.slice(0, index)}
      <span style={{ color: "#9494ff", fontWeight: 600 }}>
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </span>
  );
};

// CommandPalette
const CommandPalette = ({ open, onClose, onNavigate, clusters = [] }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const activeRef = useRef(null);

  const allItems = buildItems(clusters);

  // Filter items based on query
  const filtered = query.trim()
    ? allItems
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.label.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length > 0)
    : allItems;

  // List of all visible items for keyboard navigation
  const flatItems = filtered.flatMap((g) => g.items);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Handle item selection
  const handleSelect = useCallback(
    (item) => {
      if (item.type === "external") {
        window.open(item.href, "_blank", "noopener noreferrer");
        onClose();
        return;
      }
      if (item.type === "page") {
        onNavigate(item.id);
        onClose();
        return;
      }
      if (item.type === "cluster") {
        onNavigate("clusters", item.cluster);
        onClose();
        return;
      }
      if (item.type === "action") {
        if (item.id === "action-create-cluster") {
          onNavigate("clusters");
        }
        onClose();
        return;
      }
    },
    [onNavigate, onClose],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (flatItems[activeIndex]) {
          handleSelect(flatItems[activeIndex]);
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, flatItems, activeIndex, handleSelect, onClose]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  let globalIndex = 0;

  return (
    <Backdrop onClick={onClose}>
      <PaletteContainer onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <SearchRow>
          <Search size={18} color="#94a3b8" style={{ flexShrink: 0 }} />
          <Box
            component="input"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, clusters, docs..."
            sx={{
              flexGrow: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "text.primary",
              fontSize: "15px",
              fontFamily: "inherit",
              caretColor: "#9494ff",
              "&::placeholder": { color: "#475569" },
            }}
          />
          <KbdBadge>Esc</KbdBadge>
        </SearchRow>

        {/* Results */}
        <ResultsList>
          {filtered.length === 0 ? (
            <Box
              sx={{
                py: "32px",
                textAlign: "center",
                color: "text.secondary",
                fontSize: "14px",
              }}
            >
              No results for "{query}"
            </Box>
          ) : (
            filtered.map((group) => (
              <Box key={group.group} sx={{ mb: "4px" }}>
                <GroupLabel>{group.group}</GroupLabel>
                {group.items.map((item) => {
                  const currentIndex = globalIndex++;
                  const isActive = currentIndex === activeIndex;
                  const Icon = item.icon;

                  return (
                    <ResultItem
                      key={item.id}
                      isActive={isActive}
                      ref={isActive ? activeRef : null}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(currentIndex)}
                    >
                      <ResultIcon>
                        <Icon size={14} />
                      </ResultIcon>

                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: isActive ? "primary.main" : "text.primary",
                            lineHeight: 1.3,
                          }}
                        >
                          <HighlightMatch text={item.label} query={query} />
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "text.secondary",
                            lineHeight: 1.4,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>

                      {item.type === "external" ? (
                        <ExternalLink
                          size={13}
                          color="#475569"
                          style={{ flexShrink: 0 }}
                        />
                      ) : (
                        <ArrowRight
                          size={13}
                          color="#475569"
                          style={{ flexShrink: 0, opacity: isActive ? 1 : 0 }}
                        />
                      )}
                    </ResultItem>
                  );
                })}
              </Box>
            ))
          )}
        </ResultsList>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            px: "12px",
            py: "8px",
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            flexShrink: 0,
          }}
        >
          {[
            { keys: ["↑", "↓"], label: "navigate" },
            { keys: ["↵"], label: "select" },
            { keys: ["Esc"], label: "close" },
          ].map(({ keys, label }) => (
            <Box
              key={label}
              sx={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              {keys.map((k) => (
                <KbdBadge key={k}>{k}</KbdBadge>
              ))}
              <Typography
                sx={{ fontSize: "11px", color: "text.secondary", ml: "2px" }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </PaletteContainer>
    </Backdrop>
  );
};

export default CommandPalette;
