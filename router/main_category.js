const express = require('express')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')
const { add_main_category } = require('../controller/main_category')

const main_categoryRouter = express.Router()

main_categoryRouter.post('/add/parent/category', auth, checkRole, add_main_category)
// main_categoryRouter.get('/get/category', getAllCategory)
// main_categoryRouter.delete('/delete/category', deleteCategory)

module.exports = main_categoryRouter