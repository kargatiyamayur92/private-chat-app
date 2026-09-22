import { usermodel } from "../models/user.model.js"
import fs from 'fs'


export const profileupdate = async (req, res) => {
    try {
        const { name, id } = req.params;

        const user = await usermodel.findOne({ _id: id });

        if (!user) {
            return res.json({
                success: false,
                msg: "User does not exist"
            });
        }

        // Save old image before replacing it
        const oldProfileImage = user.profileimage;

        // New uploaded image
        const newProfileImage = req.file?.filename;

        if (!newProfileImage) {
            return res.json({
                success: false,
                msg: "Profile image is required"
            });
        }

        // Update user
        user.profileimage = newProfileImage;
        user.lastName = name;
        user.firstName = "";

        await user.save();

        // Delete old image
        if (oldProfileImage) {
            const oldImagePath = `public/images/${oldProfileImage}`;

            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Old profile image delete error:", err);
                    }
                });
            }
        }

        return res.json({
            success: true,
            msg: "User profile successfully updated"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Profile update failed"
        });
    }
};