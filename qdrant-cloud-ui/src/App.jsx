import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar";
import { drawerWidth } from "./components/Sidebar/SidebarStyled";

const App = () => {
  const [activeItem, setActiveItem] = useState("get-started");

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Sidebar activeItem={activeItem} onSelect={setActiveItem} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          overflow: "auto",
          height: "100vh",
        }}
      >
        {/* Pages */}
      </Box>
    </Box>
  );
};

export default App;
