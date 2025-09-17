// //

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import AuthRoutes from "./routes/Auth.js";
// import NotesRoutes from "./routes/Notes.js";

// dotenv.config();

// const app = express();

// // ✅ allowed origins
// const allowedOrigins = [
//   "https://jaysingh-notes.vercel.app", // frontend (Vercel)
//   "http://localhost:5173",             // local dev
// ];

// // ✅ setup cors
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // ✅ handle preflight requests (OPTIONS)
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Origin",
//       allowedOrigins.includes(req.headers.origin)
//         ? req.headers.origin
//         : allowedOrigins[0]
//     );
//     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     return res.sendStatus(200);
//   }
//   next();
// });

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
//     app.listen(PORT, () => {
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

// ✅ allowed origins (your frontend + localhost)
// const allowedOrigins = [
//   "https://jaysingh-notes.vercel.app", // frontend on Vercel
//   "http://localhost:5173",           // local dev
// ];

// // ✅ setup CORS (simple & clean)
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps or curl)
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



const corsOptions = {
  origin: "https://jaysingh-notes.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ valid here
};

app.use(cors(corsOptions));




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

// ✅ start server after DB connection
const startServer = async () => {
  try {
    await connectDB(); // wait for MongoDB connection
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

startServer();
