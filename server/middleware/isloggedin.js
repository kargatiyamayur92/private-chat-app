import jwt from 'jsonwebtoken'

export const isloggdin = async (req, res, next) => {
    let token = req.cookies.token

    if (!token) {
       return res.json(
            {
                success: false,
                msg: "You are not loggedin"
            }
        )
    }

    try {
        let decoded = jwt.verify(token, process.env.SECRATE)
        req.user = decoded
        next()

    } catch (error) {
        console.log(error)
    }

}