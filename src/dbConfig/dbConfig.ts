import mongoose from 'mongoose';

const connect =async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err)=>{
            console.log("MongoDB connection failed");
            console.log(err)
            process.exit();
        })
    } catch (error) {
        console.log('DB connection failed', error);
        
    }
}
export default connect;