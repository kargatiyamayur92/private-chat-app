import mongoose from "mongoose";

const connectDB = (async () => {
    await mongoose.connect(`${process.env.Mongoose_URI}/${process.env.DATABASENAME}`)
        .then(() => {
            console.log("Database run at : ", process.env.Mongoose_URI)
        })
        .catch((err) => {
            console.log("Eroror : ", err)
        })
})

export default connectDB