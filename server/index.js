import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connect", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (msg) => {
    io.emit("show-messages", socket.id, msg);
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/chat")
  .then(
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    })
  )
  .catch((e) => console.log(e));
