import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    userName:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
},{
    timestamps:true
})

const UserModel=mongoose.model("User",UserSchema)

export default UserModel