import { usermodel } from "../models/user.model.js";
import { messagemodel } from "../models/messages.model.js";

export const getownmessages = async (req, res) => {
    try {
        console.log("get oen messages...............")

        let { senderid, reciverid } = req.params


        let messages = await messagemodel.find({ $and: [{ $or: [{ sender: senderid }, { reciver: senderid }] }, { $or: [{ sender: reciverid }, { reciver: reciverid }] }], deletedFor: { $ne: senderid } })

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

        // 1. Mark messages as deleted for current user
        const result = await messagemodel.updateMany(
            {
                $or: [
                    {
                        sender: userid,
                        reciver: selecteduserid
                    },
                    {
                        sender: selecteduserid,
                        reciver: userid
                    }
                ],
                deletedFor: {
                    $ne: userid
                }
            },
            {
                $addToSet: {
                    deletedFor: userid
                }
            }
        );

        // 2. Permanently delete messages
        //    when BOTH users have deleted them
        const permanentlyDeleted = await messagemodel.deleteMany({
            $or: [
                {
                    sender: userid,
                    reciver: selecteduserid
                },
                {
                    sender: selecteduserid,
                    reciver: userid
                }
            ],
            deletedFor: {
                $all: [userid, selecteduserid]
            }
        });

        console.log("Marked deleted:", result.modifiedCount);
        console.log(
            "Permanently deleted:",
            permanentlyDeleted.deletedCount
        );

        res.json({
            success: true,
            msg: "Messages deleted for you",
            markedDeleted: result.modifiedCount,
            permanentlyDeleted: permanentlyDeleted.deletedCount
        });

    } catch (error) {
        console.log("Delete messages error:", error);

        res.status(500).json({
            success: false,
            msg: "Failed to delete messages"
        });
    }
};