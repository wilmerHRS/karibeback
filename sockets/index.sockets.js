import { Server } from "socket.io";

import rolSockets from "./rol.sockets.js";

export function createSockets(io = new Server()) {
  //On connection
  io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    socket.emit("get-all-rol", await rolSockets.getAll());
  });
}
