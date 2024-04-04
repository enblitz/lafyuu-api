const express = require('express')
const { addCategory, getAllCategory, deleteCategory } = require('../controller/category')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')
const { upload } = require('../config/multerConfig')

const categoryRouter = express.Router()

categoryRouter.post('/add/category',upload.single('category_image'),auth, checkRole, addCategory)
categoryRouter.get('/get/category', getAllCategory)
categoryRouter.delete('/delete/category', deleteCategory)

module.exports = categoryRouter