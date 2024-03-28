const express = require('express')
const { addBanner, getBanner } = require('../controller/banner')
const { upload } = require('../config/multerConfig')

const bannerRouer = express.Router()

bannerRouer.post('/add/banner', upload.single('banner_image'), addBanner)
bannerRouer.get('/get/banner', getBanner)

module.exports = bannerRouer