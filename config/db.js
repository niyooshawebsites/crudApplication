import mongoose from "mongoose";
import colors from "colors";
const connection = async() =>{
    try {
        const connectionString = process.env.MONGO_URI;
        const connectDB = await mongoose.connect(`${connectionString}`);
        connectDB ?console.log(colors.bgYellow(`connected to DB successfully`))
        :console.log(colors.red(`failed to connect`)); 
    } catch (err) {
        console.log(err.message);
    }
};

export default connection;