//  import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import AuthRoutes from "./routes/Auth.js";
// import NotesRoutes from "./routes/Notes.js";

// dotenv.config();
// const app = express();

// // ✅ CORS allowed origins (frontend + local dev)
// const allowedOrigins = [
//   "https://jaysingh-notes.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like Postman, curl)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ middleware
// app.use(cookieParser());
// app.use(express.json());

// // ✅ routes
// app.use("/auth", AuthRoutes);
// app.use("/notes", NotesRoutes);

// // test route
// app.get("/", (req, res) => {
//   res.send("Hello from backend 🚀");
// });

// // ✅ start server after DB connection
// const startServer = async () => {
//   try {
//     await connectDB(); // wait for MongoDB connection
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`✅ Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Failed to connect to MongoDB", err);
//     process.exit(1);
//   }
// };

// startServer();




 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.js";
import NotesRoutes from "./routes/Notes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  "https://jaysingh-notes.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

// Listen on dynamic port provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
