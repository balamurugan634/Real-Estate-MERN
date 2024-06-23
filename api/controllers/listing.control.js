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
export const delListing=async (req,res,next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){return next(errorHandler(401,"listing not fouund"))}
    if(req.user.id !== listing.userRef){return next(errorHandler(401,'unauthorized'))}
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted successfully")
    } catch (error) {
        next(error)
    }
}
export const updateList=async (req,res,next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){return next(errorHandler(401,"listing not found"))}
    if(req.user.id !== listing.userRef){return next(errorHandler(401,"unauthorized"))}
    try {
        const updatedlist=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updatedlist)

    } catch (error) {
        next(error)
    }
}