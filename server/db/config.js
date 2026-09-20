import mongoose from "mongoose";

const connectDB = (async () => {
    try {
        await mongoose.connect(`${process.env.Mongoose_URI}/${process.env.DATABASENAME}`)
            .then(() => {
                console.log("Database run at : ", process.env.Mongoose_URI)
            })
            .catch((err) => {
                console.log("Eroror : ", err)
            })
    } catch (error) {
        console.log("MongoDb connection failed : ", error)
    }

})

export default connectDB