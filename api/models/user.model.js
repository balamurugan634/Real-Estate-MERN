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
    }
},{timestamps:true});
const User=mongoose.model('User',user_schema)
export default User;