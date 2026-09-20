import { usermodel } from "../models/user.model.js"
import fs from 'fs'


export const profileupdate = async (req, res) => {
    //console.log(req.file)
    let { filename } = await req.file
    let { name, id } = await req.params
    //console.log(req.params)
    let user = await usermodel.findOne({ _id: id })
    // console.log(user)
    if (!user) {
        return res.json(
            {
                success: false,
                msg: "USer does not exist"
            }
        )
    }

    user.profileimage = filename
    user.lastName = name
    user.firstName = ""
    user.save()


    if (filename) {
        if (fs.existsSync(`public/images/${user.profileimage}`)) {
            fs.unlink(`public/images/${user.profileimage}`, (err) => {
                if (err) {
                    return res.json(
                        {
                            success: false,
                            msg: "profile image delete error"
                        }
                    )
                }
            })
        }
    }


    return res.json(
        {
            success: true,
            msg: "User profile successfuly updated"
        }
    )

}