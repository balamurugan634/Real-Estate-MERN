import Listing from "../models/list.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing=async (req,res,next)=>{
    try {
        const list=await Listing.create(req.body)
        return res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const showListing=async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const listing=await Listing.find({userRef:req.params.id})
            res.status(200).json(listing)
        } catch (error) {
          next(error)  
        }
    }
    else{
        next(errorHandler(401,"unauthorized"))
    }
}