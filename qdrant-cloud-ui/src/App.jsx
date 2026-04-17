import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import CommandPalette from "./components/CommandPalette/CommandPalette";
import { drawerWidth } from "./components/Sidebar/SidebarStyled";
import GetStarted from "./pages/GetStarted/GetStarted";
import Clusters from "./pages/Clusters/Clusters";
import ClusterList from "./pages/Clusters/ClusterList";
import ClusterDetail from "./pages/Clusters/ClusterDetail";

const App = () => {
  const [activeItem, setActiveItem] = useState("get-started");

  // Command palette state
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Cluster state
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [clusterView, setClusterView] = useState("create");

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle navigation from command palette
  const handlePaletteNavigate = (itemId, clusterData = null) => {
    if (itemId === "clusters" && clusterData) {
      setActiveItem("clusters");
      setSelectedCluster(clusterData);
      setClusterView("detail");
      return;
    }
    setActiveItem(itemId);
    if (itemId === "clusters") {
      setClusterView(clusters.length > 0 ? "list" : "create");
      setSelectedCluster(null);
    }
  };

  // Sidebar selection
  const handleSidebarSelect = (item) => {
    setActiveItem(item);
    if (item === "clusters") {
      if (clusters.length === 0) {
        setClusterView("create");
      } else {
        setClusterView("list");
        setSelectedCluster(null);
      }
    }
  };

  // Cluster creation
  const handleClusterCreate = (newCluster) => {
    setClusters((prev) => [...prev, newCluster]);
    setSelectedCluster(newCluster);
    setClusterView("detail");
  };

  // Cluster selection from list
  const handleClusterSelect = (cluster) => {
    setSelectedCluster(cluster);
    setClusterView("detail");
  };

  // Back to list
  const handleBackToList = () => {
    setSelectedCluster(null);
    setClusterView(clusters.length > 0 ? "list" : "create");
  };

  // Create new from list
  const handleCreateNew = () => {
    setClusterView("create");
  };

  const renderClustersSection = () => {
    if (clusterView === "detail" && selectedCluster) {
      return (
        <ClusterDetail cluster={selectedCluster} onBack={handleBackToList} />
      );
    }
    if (clusterView === "list" && clusters.length > 0) {
      return (
        <ClusterList
          clusters={clusters}
          onSelect={handleClusterSelect}
          onCreateNew={handleCreateNew}
        />
      );
    }
    return <Clusters onCreate={handleClusterCreate} />;
  };

  const renderPage = () => {
    switch (activeItem) {
      case "get-started":
        return <GetStarted />;
      case "clusters":
        return renderClustersSection();
      default:
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.disabled",
              fontSize: "0.875rem",
            }}
          >
            {activeItem} — coming soon
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Sidebar activeItem={activeItem} onSelect={handleSidebarSelect} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${drawerWidth}px)`,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <TopBar onSearchOpen={() => setPaletteOpen(true)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          {renderPage()}
        </Box>
      </Box>

      {/* Command Palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={handlePaletteNavigate}
        clusters={clusters}
      />
    </Box>
  );
};

export default App;
