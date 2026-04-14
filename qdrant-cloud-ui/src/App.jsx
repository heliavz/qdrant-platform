import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import { drawerWidth } from "./components/Sidebar/SidebarStyled";
import GetStarted from "./pages/GetStarted/GetStarted";

const App = () => {
  const [activeItem, setActiveItem] = useState("get-started");

  const renderPage = () => {
    switch (activeItem) {
      case "get-started":
        return <GetStarted />;
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
      <Sidebar activeItem={activeItem} onSelect={setActiveItem} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${drawerWidth}px)`,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <TopBar />
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
    </Box>
  );
};

export default App;
