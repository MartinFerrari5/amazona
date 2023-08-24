import express from "express";
import bodyParser from "body-parser";
import router from "./routes/posts.routes.js";
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
dotenv.config()
const port = process.env.port || 4000
const app = express()
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "../frontend-real/build")))
// THIS LINE OF CODE SURF IN THE BUILD FOLDER ALL THE STATIC FILES (LIKE IMG)
app.get("*",(req,res)=>{
    // res.sendFile(path.join(__dirname,"../frontend-real/build/index.html"))
})


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