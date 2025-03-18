import express from "express"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import cors from "cors"
const app=express();

app.use(cors({

    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))//folder

app.use(cookieParser())


//routes declerations
app.use("/api/v1/users", userRouter)

export {app}