import React from "react";
import ShowMessages from "./ShowMessages";
import MessageForm from "./MessageForm";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { Box } from "@mui/material";

function ChatPage() {
  const [messages, setMessages] = useState([{ id: "", msg: "" }]);

  useEffect(() => {
    function onConnect() {
      socket.connect();
    }

    function onDisconnect() {
      socket.disconnect();
    }
    function showMessages(id, msg) {
      setMessages((prevMsgs) => [...prevMsgs, { id, msg }]);
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
      }}
    >
      <Box
        p={3}
        sx={{
          position: "absolute",
          width: "100%",
          height: "80%",
          overflowY: "scroll",
        }}
      >
        <ShowMessages messages={messages} />
      </Box>

      <Box p={3} sx={{ position: "absolute", bottom: "0", width: "100%" }}>
        <MessageForm />
      </Box>
    </Box>
  );
}

export default ChatPage;
