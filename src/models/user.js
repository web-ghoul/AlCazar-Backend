const mongoose = require("mongoose")

const {Schema} = mongoose 

const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,"First Name is Required"],
    },
    lastName:{
        type:String,
        required:[true,"Last Name is Required"],
    },
    phone:{
        type:String,
        required:[true,"Phone Number is Required"],
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        min:[8,"Must Password will be 8 Characters at least"]
    },
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)