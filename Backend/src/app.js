const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/auth.routes");
const messageRoutes = require("./Routes/message.routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://sasifer.vercel.app", "https://sasify.onrender.com"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

module.exports = app;
