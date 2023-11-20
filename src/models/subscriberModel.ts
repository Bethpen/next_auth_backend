import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "please provide your email address"],
        unique: true
    }
    
})

const Subscriber = mongoose.models.subscriber || mongoose.model("Subscriber", subscriberSchema)

export default Subscriber;