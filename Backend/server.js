import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";
import routers from "./routes/router.js";


dotenv.config({path:"./config/config.env"});

await connectDatabase();

const app = express();
let corsOptions = {
    origin :["http://localhost:4002"],
}


app.use(cors({
    origin :["http://localhost:5173"], // your frontend URL
    methods : ['GET' , 'POST' , 'PUT' , 'DELETE' , 'OPTIONS'],
    credentials: true
}));

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));

app.use('/', routers);

// app.get('/', (req, res) => {
//     res.send('Hello from Node.js backend!');
//   });

const PORT = process.env.PORT || 4002;
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
