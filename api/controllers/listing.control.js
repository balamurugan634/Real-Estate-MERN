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