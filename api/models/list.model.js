import mongoose from "mongoose";

const listingschema=new mongoose.Schema({
    // _id:{
    //     type:String,
    // },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    regularprice:{
        type:Number,
        required:true,
    },
    discountprice:{
        type:Number,
        required:true,
    },
    bathrooms:{
        type:Number,
        required:true,
    },
    bedrooms:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },
    offers:{
        type:Boolean,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Listing=mongoose.model('Listing',listingschema)

export default Listing