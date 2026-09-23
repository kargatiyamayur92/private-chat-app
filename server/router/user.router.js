import express from 'express'
import { Router } from 'express'
import upload from '../config/multer.js'

const router = express.Router()


import { getallpeople, getprofile, loginOTPVerify, loginpass, logiOTPSEND, logout, register } from '../controllers/Auth.controllers.js'
import { isloggdin } from '../middleware/isloggedin.js'
import { deleteallmessages, getownmessages } from '../controllers/messages.controller.js'
import { profileupdate } from '../controllers/profile.js'

router.post('/register', register)
router.post('/login/password', loginpass)
router.post('/loginOTPSEND', logiOTPSEND)
router.post('/loginOTPVerify', loginOTPVerify)
router.post('/logout', isloggdin, logout)
router.get('/getprofile', isloggdin, getprofile)
router.get('/getallpeople/:id', isloggdin, getallpeople)
router.get('/getownmessages/:senderid/:reciverid', getownmessages)
router.post('/updateprofile/:name/:id', isloggdin, profileupdate)
router.post('/deleteallmessages/:userid/:selecteduserid', isloggdin,deleteallmessages )


export default router