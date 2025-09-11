import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DbCon from './config/db.js'
import AuthRoutes from './routes/Auth.js'
import NotesRoutes from './routes/Notes.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
dotenv.config()
const PORT=process.env.PORT
const app=express()

DbCon();

// app.use(cors({
//     credentials: true,
//     origin: ['https://jaysingh-notes.vercel.app/',
//     'http://localhost:5173']  // Replace with your frontend URL
// }));

const allowedOrigins = [
  "https://jaysingh-notes.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);



app.use(cookieParser())
app.use(express.json())
app.use('/auth',AuthRoutes)
app.use('api/notes',NotesRoutes)

app.get('/',(req,res)=>{
    res.send('hello from backend')
})



app.listen(PORT,()=>{
    console.log(`App is ruuning on Port ${PORT}`)
})



