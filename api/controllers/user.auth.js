import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
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