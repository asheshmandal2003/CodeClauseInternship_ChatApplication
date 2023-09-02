import React from "react";
import ShowMessages from "./ShowMessages";
import MessageForm from "./MessageForm";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Box, Card } from "@mui/material";

function ChatPage() {
  const [messages, setMessages] = useState([{ id: "", msg: "", time: "" }]);

  useEffect(() => {
    function onConnect() {
      socket.connect();
    }

    function onDisconnect() {
      socket.disconnect();
    }
    function showMessages(id, msg, time) {
      setMessages((prevMsgs) => [...prevMsgs, { id, msg, time }]);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("show-messages", showMessages);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("show-messages", showMessages);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "50%",
        height: "90%",
        border: "1px solid #666",
        borderRadius: "10px",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        p={3}
        sx={{
          position: "absolute",
          width: "100%",
          height: "80%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#555",
            borderRadius: "10px",
          },
        }}
      >
        <Card
          sx={{
            width: "fit-content",
            height: "fit-content",
            p: "10px",
            mt: "10px",
            mb: "20px",
            ml: "46%",
          }}
        >
          Today
        </Card>
        <ShowMessages messages={messages} />
      </Box>

      <Box
        p={3}
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          borderTop: "1px solid #333",
        }}
      >
        <MessageForm />
      </Box>
    </Box>
  );
}

export default ChatPage;
