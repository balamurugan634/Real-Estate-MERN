import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.signup.route.js'
dotenv.config({path:'./.env'})
const app=express()
mongoose.connect(process.env.MONGO).then(()=>console.log("connected")).catch((err)=>console.log(err))
app.listen(3000,()=>{
    console.log("i am listening")
})
app.use(express.json())
app.use('/api/auth',UserRouter)
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})