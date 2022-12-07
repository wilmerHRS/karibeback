import express from "express";
import SwaggerUI from "swagger-ui-express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { apiDefinition, validateInputs } from "./openapi.js";
import routes from "../routes/index.routes.js";
import { sendErrorResponse } from "../middlewares/sendErrorResponse.js";
// import { createSockets } from "../sockets/index.sockets.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:5500",
    },
  },
});

// Sockets
io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

// cors
app.use(cors());

app.use(express.json());

// integrar SwaggerUI
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(apiDefinition));

//integrar las validaciones q otorga OpenAPI
app.use(validateInputs);

//integrar las rutas
app.use("/api/v1", routes);

// handle Global Error
app.use(sendErrorResponse);

export { server, io };
