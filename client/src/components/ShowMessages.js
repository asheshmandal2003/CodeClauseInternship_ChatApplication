import { Box, Card, Typography } from "@mui/material";
import { socket } from "../socket";
import moment from "moment";
import Avatar from "@mui/material/Avatar";

function ShowMessages({ messages }) {
  return (
    <>
      {messages.map((message, idx) => (
        <span key={idx}>
          {message.msg !== "" && (
            <Box
              component={"div"}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: `${message.id === socket.id && "right"}`,
              }}
            >
              <Avatar sx={{ mr: "10px" }}>U</Avatar>
              <Card
                sx={{
                  width: "auto",
                  maxWidth: "60%",
                  marginBottom: "20px",
                  padding: "10px 20px",
                  backgroundColor: `${message.id === socket.id && "#43a047"}`,
                }}
              >
                <Typography fontWeight={600}>User</Typography>
                {message.msg}
                <sub style={{ fontSize: "10px", marginLeft: "10px" }}>
                  {moment(message.time).format("HH:mm")}
                </sub>
              </Card>
            </Box>
          )}
        </span>
      ))}
    </>
  );
}

export default ShowMessages;
