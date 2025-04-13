import express from "express";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";
import routers from "./routes/router.js";


dotenv.config({path:"./config/config.env"});

await connectDatabase();

const app = express();

app.use(cors({
    origin :["http://localhost:5173"], // your frontend URL
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE' , 'OPTIONS'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routers);

// app.get('/', (req, res) => {
//     res.send('Hello from Node.js backend!');
//   });

const PORT = process.env.PORT || 4002;
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
