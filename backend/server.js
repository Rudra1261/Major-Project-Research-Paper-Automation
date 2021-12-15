import express, { request } from "express";
// import { Mongoose } from "mongoose";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

import User from "./routes/api/users.js";
import Auth from "./routes/api/auth.js";
import Paper from "./routes/api/paper.js";
// import Post from './routes/api/post.js'

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api/users", User);
app.use("/api/auth", Auth);
app.use("/api/paper", Paper);
// app.use('/api/post',Post)
// app.use('/api/profile',Profile)
