const express = require('express')
const {signUp, loginCtrl} = require('../controller/userCtrl')

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', loginCtrl)

module.exports = userRouter