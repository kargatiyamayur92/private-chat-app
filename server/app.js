import express, { urlencoded } from 'express'
import connectDB from './db/config.js'
import userRouter from './router/user.router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import { usermodel } from './models/user.model.js'
import { messagemodel } from './models/messages.model.js'
import dotenv from 'dotenv'
import path from 'path'

const app = express()

app.use(cors(
    {
        origin: "https://private-chat-app-ruby-nu.vercel.app",
        credentials: true,
    }
))

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static('public'))
app.use('/api/v1', userRouter)

dotenv.config(
    {
        path: './.env'
    }
)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://private-chat-app-ruby-nu.vercel.app",
        credentials: true
    }
})


io.on("connection", (socket) => {
    console.log("Connect user : ", socket.id)


    socket.on("joinRoom", async (userid) => {
        //console.log("user id",userid)
        if (!userid || !userid.trim()) return

        const userID = userid.trim()
        let user = await usermodel.findOne({ _id: userID })
        //console.log(user)
        user.online = true
        user.save()
        socket.userID = userID
        socket.join(userID)

        io.to(userID).emit('USer joined')

        io.emit("userOnline", {
            userId: userid,
            online: true
        });

    })


    socket.on("sendMessage", async (data) => {
        //console.log(data)
        let { senderuserid, reciveruserid, message } = data
        let now = new Date()
        let time = now.toLocaleTimeString()
        let msg = await messagemodel.create({ sender: senderuserid, reciver: reciveruserid, text: message, time: time })

        // console.log(msg)

        let users = await usermodel.find({ _id: { $in: [senderuserid, reciveruserid] } })

        users.forEach(async (user) => {
            user.messages.push(msg._id)
            await user.save()
        })

        //console.log(users)

        io.to(reciveruserid).emit("receiveMessage", { senderuserid, message })

    })

    //typing
    socket.on("typing", (data) => {
        let { senderid, reciverid, istype } = data

        io.to(reciverid).emit("type", { senderid: senderid, reciverid: reciverid, istype: istype })
    })

    socket.on("disconnect", async () => {
        console.log("Disconnect : ", socket.userID)
        if (!socket.userID) {
            return
        }

        io.emit("userOnline", {
            userId: socket.userID,
            online: true
        });

        let user = await usermodel.findOne({ _id: socket.userID })
        user.online = false
        await user.save()
    })
})

const PORT = process.env.PORT || 3000

connectDB()
    .then(() => {
        server.listen(PORT, "0.0.0.0", () => {
            console.log("Server listen at port:", PORT);
        });
    })
    .catch((err) => {
        console.log("Database connection failed:", err.message);
    });

