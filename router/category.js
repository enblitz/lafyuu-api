const express = require('express')
const { addCategory, getAllCategory } = require('../controller/category')

const categoryRouter = express.Router()

categoryRouter.post('/add/category', addCategory)
categoryRouter.get('/get/category', getAllCategory)

module.exports = categoryRouter