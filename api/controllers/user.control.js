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
