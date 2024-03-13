const express = require('express')
const {signUp, loginCtrl, getUserProfileCtrl, sendForgotPass} = require('../controller/userCtrl')
const auth = require('../middleware/auth')

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', loginCtrl)
userRouter.get('/profile', auth, getUserProfileCtrl)
userRouter.post('/sendEmail', sendForgotPass)

module.exports = userRouter