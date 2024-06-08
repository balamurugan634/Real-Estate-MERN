import jwt  from "jsonwebtoken";
import { errorHandler } from "./error.js";
import dotenv from 'dotenv'
dotenv.config()
export const verifytoken=(req,res,next)=>{
    const token=req.cookies.access_token;

    if(!token) return next(errorHandler(401,"unauthorized"))

        jwt.verify(token,process.env.SECRET,(err,user)=>{
            
            if(err) return next(errorHandler(402,"forbidden"));

            req.user=user;
            next()

        });
}