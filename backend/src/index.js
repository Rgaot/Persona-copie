import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"
import path from "path";

import connectDb from "./utils/db.js";
import { app, server } from "./utils/socket.js";

import authRoutes from "./routes/auth-route.js";
import messageRoutes from "./routes/message-route.js";
import sondageRoutes from "./routes/sondage-route.js";

dotenv.config();

// start the server
const PORT = process.env.PORT;
const __dirname = path.resolve();

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running on port : " + PORT);
  });
});

// middlewares
app.use(cookieParser());
app.use(express.json({ limit: "400kb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  }),
);



// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/sondage", sondageRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
