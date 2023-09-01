import { Box, Card } from "@mui/material";
import { socket } from "../socket";

function ShowMessages({ messages }) {
  return (
    <>
      {messages.map((message, i) => (
        <Box
          key={i}
          component={"div"}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: `${message.id === socket.id && "right"}`,
          }}
        >
          <Card
            sx={{
              width: "auto",
              maxWidth: "60%",
              marginBottom: "8px",
              padding: "10px 20px",
              backgroundColor: `${message.id === socket.id && "#43a047"}`,
            }}
          >
            {message.msg}
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ShowMessages;
