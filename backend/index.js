 import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import AuthRoutes from './routes/Auth.js';
import NotesRoutes from './routes/Notes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// connect to DB
connectDB();

// allowed origins
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
  })
);

// ✅ Preflight requests (OPTIONS)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// middleware
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/auth', AuthRoutes);
app.use('/notes', NotesRoutes);

app.get('/', (req, res) => {
  res.send('hello from backend');
});

// ✅ Fix for Vercel: export handler (no listen in serverless)
// if (process.env.NODE_ENV === "production") {
//   export default app;
// } else {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
// }
