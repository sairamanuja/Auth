import express from "express";
import router from "./routes/routes.js";
import connectDB from "./config/mongoDB.js"
import cors from "cors"
const app = express();
const port = process.env.PORT||3000;
import { configDotenv } from "dotenv";


const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json()); 
app.use("/api", router); 
app.use(cors({ credentials: true }));

app.get("/", (req, res) => res.send("Hello World!"));

connectDB(); 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
