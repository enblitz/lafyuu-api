const express = require('express')
const {signUp, loginCtrl, getUserProfileCtrl, sendForgotPass, updateProfile, demoUpload, changePass, sendOtpToMobile, verifyOTPByUser} = require('../controller/userCtrl')
const auth = require('../middleware/auth')
const { upload } = require('../config/multerConfig')
const veriftOTP = require('../middleware/verifyOTP')

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', loginCtrl)
userRouter.get('/profile', auth, getUserProfileCtrl)
userRouter.post('/sendEmail', sendForgotPass)
userRouter.post('/update/profile', auth, upload.single('user_profile'),updateProfile)
userRouter.post('/change/password', auth, changePass)
userRouter.post('/sendOTP',auth, sendOtpToMobile)
userRouter.post('/verify/otp', auth, veriftOTP, verifyOTPByUser)


module.exports = userRouter