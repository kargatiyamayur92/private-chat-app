import mongoose from "mongoose";

const messagesSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        reciver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        deletedFor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    },
    {
        timestamps: true
    }
)

export const messagemodel = mongoose.model("messages", messagesSchema)