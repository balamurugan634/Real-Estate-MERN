import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routes/user.signup.route.js'
import updaterouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import ListingRouter from './routes/listing.route.js'
import path from 'path'
dotenv.config({path:'./.env'})
const __dirname=path.resolve()

const app=express()
mongoose.connect(process.env.MONGO).then(()=>console.log("connected")).catch((err)=>console.log(err))
app.listen(3000,()=>{
    console.log("i am listening")
})
app.use(express.json())
app.use(cookieParser())
app.use('/api/user',updaterouter)
app.use('/api/auth',UserRouter)
app.use('/api/user',ListingRouter)
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
// app.use('/api/auth',loginrouter)
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
// app.use('/api/auth',)