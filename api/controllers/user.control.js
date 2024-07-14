import Listing from "../models/list.model.js"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateuser=async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'unauthorized'))

    try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }
        const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:{
            name:req.body.name,
            password:req.body.password,
            pic:req.body.pic,
            email:req.body.email,
        }},{new:true})

        const {password,...rest}=updateuser._doc
        res.status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}
export const deleteUser=async (req,res,next)=>{
    if(req.params.id !== req.user.id) return next(errorHandler(401,'you can delete only your own account'))
    try{
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json("user deleted successfully")

}catch(error){
    next(error)
}
}
export const signoutUser=async (req,res,next)=>{
    // if(req.params.id !== req.user.id) return next(errorHandler(401,'you can delete only your own account'))
    try{
        res.clearCookie('access_token')
        res.status(200).json("loged out ")
    }
catch(error){
    next(error)
}
}
export const landlord=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id) 
        if(!user){
            return next(errorHandler(404,"user not found"))
        }
        const {password:pass,...rest}=user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
