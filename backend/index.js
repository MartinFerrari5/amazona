import express from "express";
import bodyParser from "body-parser";
import router from "./routes/posts.routes.js";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.port || 4000
const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(router)

// expressAsyncHandler
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
app.get("/api/keys/paypal", (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})
app.listen(port, ()=>{
    console.log("Listening to port ", port)
})