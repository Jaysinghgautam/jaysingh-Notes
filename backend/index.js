 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
import NotesRoutes from "./routes/Notes.js";

dotenv.config();

const app = express();

// ✅ connect to DB
connectDB();

// ✅ allowed origins
const allowedOrigins = [
  "https://jaysingh-notes.vercel.app", // frontend hosted on Vercel
  "http://localhost:5173",             // local dev
];

// ✅ setup cors
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ handle preflight requests (important for cookies/auth headers)
app.options("*", cors());

// ✅ middleware
app.use(cookieParser());
app.use(express.json());

// ✅ routes
app.use("/auth", AuthRoutes);
app.use("/notes", NotesRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Hello from backend 🚀");
});


// ✅ export app for Vercel (serverless)
export default app;

// ✅ run local server only when not in production (so vercel doesn’t crash)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}
