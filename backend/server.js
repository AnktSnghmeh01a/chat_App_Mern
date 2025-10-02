import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import connectToMongoDB from "./db/connectToMongoDb.js";
dotenv.config();

const app = express();
app.use(express.json());  
app.use(cookieParser());
const PORT = process.env.PORT || 5000;


app.use(express.json()); 
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.get("/", (req, res) => {

    res.send("API is running...!!!000");

})

app.listen(PORT, () => { 
    connectToMongoDB(); 
    console.log(`Server is running on port ${PORT}`);
});
