import jwt from 'jsonwebtoken'

export const isloggdin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({
            success: false,
            msg: "You are not loggedin"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRATE);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
};