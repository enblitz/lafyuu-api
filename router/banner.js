const express = require('express')
const { addBanner, getBanner, deletBanner } = require('../controller/banner')
const { upload } = require('../config/multerConfig')
const checkRole = require('../middleware/checkRole')
const auth = require('../middleware/auth')

const bannerRouer = express.Router()

bannerRouer.post('/add/banner', auth, checkRole, upload.single('banner_image'), addBanner)
bannerRouer.get('/get/banner', getBanner)
bannerRouer.delete('/delete/banner', deletBanner)

module.exports = bannerRouer