import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.route.js'
dotenv.config({path:'./.env'})
const app=express()
mongoose.connect(process.env.MONGO).then(()=>console.log("connected")).catch((err)=>console.log(err))
app.listen(3000,()=>{
    console.log("i am listening")
})
app.use('/api/user',UserRouter)