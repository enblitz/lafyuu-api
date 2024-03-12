const express = require('express')
const userCtrl = require('../controller/userCtrl')

const userRouter = express.Router()

userRouter.post('/signup', userCtrl)

module.exports = userRouter