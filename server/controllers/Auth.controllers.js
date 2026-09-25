import { usermodel } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import OTPGenerator from './OTPGenerator.js'
import { sendOTPEmail } from './emailSender.js'

export const register = async (req, res) => {
    try {
        console.log("register.................")
        let { firstName, lastName, email, mobile, password, confirmPassword } = req.body
        //console.log(req.body)

        let check_user = await usermodel.findOne({ email })

        if (check_user) {
            return res.json(
                {
                    success: false,
                    msg: "User alereasy exist"
                }
            )
        }

        bcrypt.hash(password, 12, async (err, hash) => {

            if (!err) {
                let user = await usermodel.create({ firstName, lastName, email, mobile, password: hash });

                if (user) {
                    res.json(
                        {
                            success: true,
                            msg: "User account created"
                        }
                    )
                }
                else {
                    res.json(
                        {
                            success: false,
                            msg: "User account created error"
                        }
                    )
                }
            }
        })



    } catch (error) {
        console.log(error)
    }
}

export const loginpass = async (req, res) => {
    try {
        console.log("login with pass .................")
        let { emailOrMobile, password } = req.body

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrMobile);

        const query = isEmail ? { email: emailOrMobile } : { password: password }

        let user = await usermodel.findOne(query)

        //console.log(user)

        if (!user) {
            return res.json(
                {
                    success: false,
                    msg: "User not exist"
                }
            )
        }

        bcrypt.compare(password, user.password, async (err, response) => {

            if (response) {

                let token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email
                    },
                    process.env.SECRATE
                )

                if (token) {
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });
                }

                user.online = true
                await user.save()

                res.json(
                    {
                        success: true,
                        msg: "User login successfully"
                    }
                )
            }
            else {
                res.json(
                    {
                        success: false,
                        msg: "Access denite"
                    }
                )
            }
        })



    } catch (error) {
        console.log(error)
    }
}

export const logiOTPSEND = async (req, res) => {
    try {
        console.log("login with otp.................")

        let { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Email is required"
            });
        }

        //console.log(email)
        let user = await usermodel.findOne({ email: email })

        //console.log(user)

        if (!user) {
            return res.json(
                {
                    success: false,
                    msg: "User not exist"
                }
            )
        }

        let otp = OTPGenerator()

        await sendOTPEmail(email,otp) 

        bcrypt.hash(otp, 12,async (err, hash) => {
            if (hash) {
                user.OTP = hash
                await user.save()
            }

        })

        res.json(
            {
                success: true,
                msg: "OTP Send Your Email"
            }
        )




    } catch (error) {
        console.log(error)
    }
}

export const loginOTPVerify = async (req, res) => {
    try {
        console.log("login with otp verify.................")

        let { email, otp } = req.body

        let user = await usermodel.findOne({ email: email })

        //console.log(user)

        if (!user) {
            return res.json(
                {
                    success: false,
                    msg: "User not exist"
                }
            )
        }

        bcrypt.compare(otp, user.OTP, (err, response) => {
            if (response) {

                let token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email
                    },
                    process.env.SECRATE
                )

                if (token) {
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });

                    res.json(
                        {
                            success: true,
                            msg: "User successfully login vai OTP"
                        }
                    )

                }


            }
            else {
                res.json(
                    {
                        success: false,
                        msg: "OTP NOT Match"
                    }
                )
            }
        })


    } catch (error) {
        console.log(error)
    }
}



export const logout = async (req, res) => {
    try {
        console.log("logout.................")

        let token = req.user

        let user = await usermodel.findOne({ _id: token.id })

        user.online = false
        await user.save()

        if (!token) {
            return res.json(
                {
                    success: false,
                    msg: "User is already logout"
                }
            )
        }

        res.cookie("token", '', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json(
            {
                success: true,
                msg: "Uaer successfully logout"
            }
        )

    } catch (error) {
        console.log(error)
    }
}

export const getprofile = async (req, res) => {
    try {
        console.log("getprofile .................")

        let token = req.user


        //console.log(token)

        let user = await usermodel.findOne({ _id: token.id })

        if (!user.online) {
            user.online = true
            await user.save()
        }


        //console.log(user)

        if (user) {
            res.json(
                {
                    success: true,
                    user
                }
            )
        }
        else {
            res.json(
                {
                    success: false,
                    msg: "User not exist"
                }
            )
        }


    } catch (error) {
        console.log(error)
    }
}


export const getallpeople = async (req, res) => {
    try {
        console.log("getprofile...............")

        let { id } = await req.params

        let users = await usermodel.find({ _id: { $ne: id } })

        //console.log(users)

        if (users) {
            res.json(
                {
                    success: true,
                    msg: "User fetched",
                    users
                }
            )
        }
        else {
            res.json(
                {
                    success: true,
                    msg: "User fetched error"
                }
            )
        }
    } catch (error) {
        console.log(error)
    }



}

