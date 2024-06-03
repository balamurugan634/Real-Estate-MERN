import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const signup =async(req,res,next)=>{
   const {name,email,password}=req.body
   const hashedpass=bcryptjs.hashSync(password,10)
   const newuser=new User({name:name,email:email,password:hashedpass})
  try{
    await newuser.save()
    res.status(201).json({message:"created"})
  }catch(err){
    // next(errorHandler(550,"error handleer"))
    next(err)
  }
  
}
export const signin=async(req,res,next)=>{
   try{ const {email,password}=req.body;
    const validuser=await User.findOne({email})
    if(!validuser){
        return next(errorHandler(500,"user not found"))
    }
    const validpassword=bcryptjs.compareSync(password,validuser.password)
    if(!validpassword){
        return next(errorHandler(401,"wrong credentials"))
    }
    const token=jwt.sign({id:validuser._id},process.env.SECRET)
    const {password:pass,...rest}=validuser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)}
    catch(err){
        next(err)
    }
}