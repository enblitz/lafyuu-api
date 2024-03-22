const express = require('express')
const {signUp, loginCtrl, getUserProfileCtrl, sendForgotPass, updateProfile, demoUpload} = require('../controller/userCtrl')
const auth = require('../middleware/auth')
const { upload } = require('../config/multerConfig')

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', loginCtrl)
userRouter.get('/profile', auth, getUserProfileCtrl)
userRouter.post('/sendEmail', sendForgotPass)
userRouter.post('/update/profile', auth, upload.single('user_profile'),updateProfile)


module.exports = userRouter