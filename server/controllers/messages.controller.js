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

export const deleteallmessages = async (req, res) => {
    try {
        const { userid, selecteduserid } = req.params;

        const result = await messagemodel.deleteMany({
            $and: [
                {
                    $or: [
                        { sender: userid },
                        { reciver: userid }
                    ]
                },
                {
                    $or: [
                        { sender: selecteduserid },
                        { reciver: selecteduserid }
                    ]
                }
            ]
        });

        res.json({
            success: true,
            msg: "All messages deleted",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.log("Delete messages error:", error);

        res.status(500).json({
            success: false,
            msg: "Failed to delete messages"
        });
    }
};
