import mongoose, { Schema } from "mongoose";
import { UserRole } from "./types/UserRole.type.js";

const userSchema = new Schema({
    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "lastName is required"]
    },
    password:{
        type: String, 
        required:[true, "password is required"]
    }, 
    isVerified: {
        type: Boolean, 
        default: false
    }, 
    role: {
        type: String, 
        enum: Object.values(UserRole), 
        default:UserRole.CUSTOMER
    }, 
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,

});



export default mongoose.model("User",userSchema );