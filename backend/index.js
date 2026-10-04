import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "dns";

// Fix DNS resolution for MongoDB Atlas SRV if needed
try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e.message);
}

dotenv.config();

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
import NotesRoutes from "./routes/Notes.js";

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  "https://jaysingh-notes.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, "");
      const isAllowed =
        allowedOrigins.some(
          (allowed) => allowed.replace(/\/$/, "") === cleanOrigin
        ) ||
        cleanOrigin.endsWith(".vercel.app"); // Allow any Vercel domain/preview deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        // Return false without crashing server
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-access-token",
      "Accept",
    ],
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/auth", AuthRoutes);
app.use("/notes", NotesRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend 🚀");
});

// Ping
app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running 🚀",
    time: new Date(),
  });
});

// Listen on dynamic port provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

