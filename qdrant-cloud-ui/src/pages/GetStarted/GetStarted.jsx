import React, { useState } from "react";
import consoleUi from "../../assets/Console-UI.svg";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import {
  Database,
  Plug,
  Code2,
  FlaskConical,
  ArrowLeftRight,
  Cpu,
  Search,
  MessageSquare,
  GitBranch,
  Cloud,
  Server,
  Lock,
  MessageCircle,
  BookOpen,
  Headphones,
} from "lucide-react";
import InfoCard from "../../components/Common/InfoCard/InfoCard";

// ─── Tab Panel ────────────────────────────────────────────────────────────────
const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: "28px" }}>
    {value === index && children}
  </Box>
);

// ─── Strict 3-column CSS grid ─────────────────────────────────────────────────
// This always shows 3 equal columns no matter the screen size.
// Each child fills the cell completely.
const ThreeColGrid = ({ children }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "16px",
      alignItems: "stretch",
    }}
  >
    {children}
  </Box>
);

// ─── Quickstart Banner ────────────────────────────────────────────────────────
const QuickstartBanner = () => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: "24px 32px",
      mb: "32px",
      background: (theme) =>
        `linear-gradient(135deg, ${theme.palette.background.paperElevation3} 0%, ${theme.palette.background.paperElevation2} 100%)`,
      border: (theme) => `1px solid ${theme.palette.divider}`,
      overflow: "hidden",
      position: "relative",
      minHeight: "140px",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        right: "-60px",
        top: "-60px",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        bgcolor: "primary.main",
        opacity: 0.04,
        pointerEvents: "none",
      }}
    />
    <Box sx={{ zIndex: 1, flexShrink: 0 }}>
      <Typography
        variant="h5"
        sx={{ color: "text.primary", mb: "6px", fontWeight: 600 }}
      >
        Cloud Quickstart
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: "16px" }}>
        Learn how to get started with Qdrant Cloud in a few steps.
      </Typography>
      <Link
        href="https://qdrant.tech/documentation/quickstart-cloud/"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: "16px",
          py: "8px",
          bgcolor: "primary.main",
          color: "#ffffff",
          borderRadius: "8px",
          fontSize: "0.875rem",
          fontWeight: 500,
          transition: "background 0.2s",
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        View Quickstart
      </Link>
    </Box>
    <Box
      component="img"
      src={consoleUi}
      alt="Qdrant Console UI"
      sx={{
        height: "120px",
        width: "auto",
        maxWidth: "380px",
        borderRadius: "8px",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        zIndex: 1,
        objectFit: "cover",
        objectPosition: "left top",
        flexShrink: 0,
      }}
    />
  </Card>
);

// ─── Explore Section ──────────────────────────────────────────────────────────
const ExploreSection = () => {
  const cards = [
    {
      icon: Plug,
      title: "Connect to Your Cluster",
      description:
        "Here are the different options you have to connect to your Qdrant cluster.",
      href: "https://qdrant.tech/documentation/quickstart-cloud/",
      ctaText: "Connect Cluster",
    },
    {
      icon: Code2,
      title: "Qdrant API",
      description:
        "Use the Qdrant API to manage, query, and scale vector data effortlessly.",
      href: "https://api.qdrant.tech/",
      ctaText: "Learn More",
    },
    {
      icon: Database,
      title: "Qdrant Cluster UI",
      description:
        "View your collection data, load sample data, and access tutorials.",
      href: "https://qdrant.tech/documentation/web-ui/",
      ctaText: "Qdrant Cluster UI",
    },
    {
      icon: FlaskConical,
      title: "Sample Data",
      description:
        "Explore Qdrant with our sample data sets and get hands-on quickly.",
      href: "https://qdrant.tech/documentation/datasets/",
      ctaText: "Load Sample Data",
    },
    {
      icon: ArrowLeftRight,
      title: "Migrate to Qdrant Cloud",
      description:
        "Migrate your data from other vector databases or Qdrant instances with ease.",
      href: "https://qdrant.tech/documentation/data-management/",
      ctaText: "Migrate Data",
    },
    {
      icon: Cpu,
      title: "Qdrant Cloud Inference",
      description:
        "Learn how to transform your data into vectors directly in Qdrant Cloud.",
      href: "https://qdrant.tech/documentation/cloud-inference/",
      ctaText: "Use Inference",
    },
  ];

  return (
    <ThreeColGrid>
      {cards.map((card) => (
        <InfoCard key={card.title} {...card} />
      ))}
    </ThreeColGrid>
  );
};

// ─── Build Section ────────────────────────────────────────────────────────────
const BuildSection = () => {
  const tutorials = [
    {
      title: "Search",
      subtitle: "Semantic search with FastEmbed",
      description:
        "Build a neural search service with Qdrant and FastEmbed. Learn to upload data, create indexes, and run queries.",
      href: "https://qdrant.tech/documentation/beginner-tutorials/hybrid-search-fastembed/",
      icon: Search,
    },
    {
      title: "RAG",
      subtitle: "Retrieval Augmented Generation",
      description:
        "Build end-to-end chat bots with Qdrant. Learn how it integrates with LangChain and LlamaIndex.",
      href: "https://qdrant.tech/documentation/rag-deepseek/",
      icon: MessageSquare,
    },
    {
      title: "Pipelines",
      subtitle: "Data stack integration",
      description:
        "Integrate Qdrant into your data stack. Connect it with popular data engineering tools for seamless workflows.",
      href: "https://qdrant.tech/documentation/data-management/",
      icon: GitBranch,
    },
  ];

  return (
    <ThreeColGrid>
      {tutorials.map((item) => (
        <Card
          key={item.title}
          sx={{
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.2s ease",
            "&:hover": { borderColor: "rgba(255, 255, 255, 0.4)" },
          }}
        >
          <Box
            sx={{
              height: "140px",
              flexShrink: 0,
              bgcolor: "background.paperElevation3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
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
                <item.icon size={24} color="#60a5fa" />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.disabled", fontSize: "11px" }}
              >
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              flexGrow: 1,
              p: "20px",
              "&:last-child": { pb: "20px" },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", flexGrow: 1, lineHeight: 1.6 }}
            >
              {item.description}
            </Typography>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "text.primary",
                fontSize: "0.875rem",
                fontWeight: 500,
                mt: "8px",
                width: "fit-content",
                "&:hover": { color: "primary.main" },
              }}
            >
              View Tutorial
            </Link>
          </CardContent>
        </Card>
      ))}
    </ThreeColGrid>
  );
};

// ─── Deployment Section ───────────────────────────────────────────────────────
const DeploymentSection = () => {
  const options = [
    {
      icon: Cloud,
      title: "Qdrant Cloud",
      description:
        "Fully managed, scalable, and ready-to-use cloud service. Zero infrastructure overhead.",
      href: "https://qdrant.tech/cloud/",
      ctaText: "Learn More",
    },
    {
      icon: Server,
      title: "Hybrid Cloud",
      description:
        "Bring your own cloud, manage Qdrant in your infrastructure with full data control.",
      href: "https://qdrant.tech/hybrid-cloud/",
      ctaText: "Learn More",
    },
    {
      icon: Lock,
      title: "Private Cloud",
      description:
        "Self-hosted, air-gapped deployments for maximum control and compliance requirements.",
      href: "https://qdrant.tech/enterprise-solutions/",
      ctaText: "Learn More",
    },
  ];

  return (
    <ThreeColGrid>
      {options.map((option) => (
        <InfoCard key={option.title} {...option} />
      ))}
    </ThreeColGrid>
  );
};

// ─── Support Section ──────────────────────────────────────────────────────────
const SupportSection = () => {
  const options = [
    {
      icon: Headphones,
      title: "Contact Support",
      description:
        "Need help? Contact Qdrant Support now and get assistance from our team directly.",
      href: "https://qdrant.tech/contact-us/",
      ctaText: "Get Support",
    },
    {
      icon: MessageCircle,
      title: "Discord Community",
      description:
        "Join 7,000+ active members to discuss all Qdrant things, share projects, and get advice.",
      href: "https://qdrant.to/discord",
      ctaText: "Join Discord",
    },
    {
      icon: BookOpen,
      title: "Documentation",
      description:
        "Access our full docs for detailed guides, API references, and best practices.",
      href: "https://qdrant.tech/documentation/",
      ctaText: "Read More",
    },
  ];

  return (
    <ThreeColGrid>
      {options.map((option) => (
        <InfoCard key={option.title} {...option} />
      ))}
    </ThreeColGrid>
  );
};

// ─── Tabs config ──────────────────────────────────────────────────────────────
const tabs = [
  { label: "Explore Your Data", component: <ExploreSection /> },
  { label: "Build Applications", component: <BuildSection /> },
  { label: "Deployment", component: <DeploymentSection /> },
  { label: "Support & Docs", component: <SupportSection /> },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const GetStarted = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      <Box component="header" sx={{ mb: "32px" }}>
        <Typography
          component="h1"
          sx={{
            color: "text.primary",
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: "125%",
            letterSpacing: "-0.5px",
            mb: "8px",
          }}
        >
          Explore Qdrant Cloud
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Everything you need to get started, build, and scale with Qdrant.
        </Typography>
      </Box>

      <QuickstartBanner />

      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            minHeight: "40px",
            "& .MuiTabs-indicator": { backgroundColor: "primary.main" },
            "& .MuiTab-root": { minHeight: "40px", py: "8px" },
            "& .MuiTab-root.Mui-selected": { color: "text.primary" },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={activeTab} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default GetStarted;
