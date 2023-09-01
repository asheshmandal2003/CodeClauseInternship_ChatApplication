import { IconButton, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket";
import { TextField } from "@mui/material";

function MessageForm() {
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (value) {
      socket.emit("send-message", value, socket.id);
      setValue("");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        placeholder="Write your message here..."
        id="fullWidth"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: value ? (
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          ) : (
            false
          ),
        }}
      ></TextField>
    </form>
  );
}

export default MessageForm;
