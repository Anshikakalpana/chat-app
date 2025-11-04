import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
     password:{
        type:String,
        required:true,
    
    },
    phoneNo:{
          type:String,
        required:true,
        unique:true,
        minlength:5

    },
    name:{
           type:String,
        required:true,
        

    },
    profile:{
        type:String,
        default:""

    }
},
{timestamps:true}

);
const User = mongoose.model('User', userSchema);
export default User

