import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please provide your first name"]
    },
    lastname: {
        type: String,
        required: [true, "please provide your last name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email address"],
        unique: true
    },
    phone_number: {
        type: String,
        required: [true, "please provide your first name"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    resetPasswprdToken: String,
    resetPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date
    
})

const User = mongoose.models.users || mongoose.model("User", userSchema)

export default User;