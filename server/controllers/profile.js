import { usermodel } from "../models/user.model.js"

export const profileupdate = async (req, res) => {
    try {
        const { name, id } = req.params;

        // Check name
        if (!name || !name.trim()) {
            return res.json({
                success: false,
                msg: "Name is required"
            });
        }

        // Find user by ID
        const user = await usermodel.findById(id);

        if (!user) {
            return res.json({
                success: false,
                msg: "User does not exist"
            });
        }

        // Update name
        user.lastName = name.trim();
        user.firstName = "";

        await user.save();

        return res.json({
            success: true,
            msg: "Profile name updated successfully"
        });

    } catch (error) {
        console.error("Profile update error:", error);

        return res.status(500).json({
            success: false,
            msg: "Profile update failed"
        });
    }
};

