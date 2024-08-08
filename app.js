import express from "express";
import * as dotenv from "dotenv";
import apiRouter from './routes/api.js'
import cookieSession from "cookie-session";
import Task from './models/task.js';
import connectDB from "./db/db.js";
import cors from 'cors';
const app = express();

dotenv.config();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true // Allow cookies to be sent
}));

connectDB();
app.use("/api", apiRouter);



app.listen(3006, (req, res) => {
    console.log("Operation port 3006 port is running");
});
