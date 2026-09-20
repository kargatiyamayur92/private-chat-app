import mongoose, { Types } from "mongoose";

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        mobile: String,
        password: String,
        OTP: String,
        profileimage: String,
        online: {
            type: Boolean,
            default: false
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
        }],
    },
    {
        timestamps: true
    }
)

export const usermodel = mongoose.model("users", userSchema)