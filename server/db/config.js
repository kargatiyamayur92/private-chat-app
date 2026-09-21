import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.Mongoose_URI,
            {
                dbName: process.env.DATABASENAME
            }
        );

        console.log(
            "MongoDB connected:",
            connection.connection.host
        );

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;