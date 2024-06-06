import mongoose from "mongoose";
const user_schema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
    }
},{timestamps:true});
const User=mongoose.model('User',user_schema)
export default User;