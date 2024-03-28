const Banner = require('../models/banner')

exports.addBanner = async (req, res, next) => {
    try {
        const { banner_title, banner_countdown } = req.body

        if (!req.file) throw new Error('Please Provide an Banner Image!')

        if (!banner_title) {
            throw new Error('Please Provide a Banner Title!');
        }

        if (!banner_countdown || isNaN(Date.parse(banner_countdown))) {
            throw new Error('Please Provide a Valid Banner Countdown Date!');
        }

        const iamgePath = req.file.path

        const counDown = new Date(banner_countdown)
        const currentTime = new Date()
        let banner_status
        let countdown_status
        //check count_down status
        if (counDown <= currentTime) {
            countdown_status = false,
            banner_status = false
        }

        const bannerDate = await Banner.create({
            banner_title,
            banner_countdown: counDown,
            banner_image: iamgePath,
            banner_status,
            countdown_status
        })

        // console.log(bannerDate.toJSON())

        res.status(200).json({
            status: {
                message: "Successfully Banner Added!",
                code: 200,
                error: false
            },
            data: {
                bannerDate
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.getBanner = async (req, res, next) => {
    try {
        const serachAllBanner = await Banner.findAll()
        if(serachAllBanner.length < 0){
            throw new Error('No Banner Avaible!')
        }

        res.status(200).json({
            status: {
                message: "Successfully Banner Fetch!",
                code: 200,
                error: false
            },
            data: {
                serachAllBanner
            }
        })
    } catch (error) {
        next(error)
    }
}