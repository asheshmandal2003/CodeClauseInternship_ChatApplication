import { Box } from "@mui/material";
import "./App.css";
import ChatPage from "./components/ChatPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Box>
  );
}

export default App;
