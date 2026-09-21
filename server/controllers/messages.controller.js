import { usermodel } from "../models/user.model.js";
import { messagemodel } from "../models/messages.model.js";

export const getownmessages = async (req, res) => {
    try {
        console.log("get oen messages...............")

        let { senderid, reciverid } = req.params


        let messages = await messagemodel.find({ $and: [{ $or: [{ sender: senderid }, { reciver: senderid }] }, { $or: [{ sender: reciverid }, { reciver: reciverid }] }] })

        //let user = await usermodel.findOne({ _id: senderid }).populate('messages');

        //console.log(messages)

        if (messages.length > 0) {
            res.json(
                {
                    success: true,
                    messages: messages
                }
            )
        }
        else {
            res.json(
                {
                    success: false,
                    msg: "Not any messages exist"
                }
            )
        }

    } catch (error) {
        console.log(error)
    }
}