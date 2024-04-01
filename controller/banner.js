const Banner = require('../models/banner');
const { checkValidStringType } = require('../utils/validation');

exports.addBanner = async (req, res, next) => {
    try {
        const { banner_title, banner_countdown } = req.body

        if (!req.file) throw new Error('Please Provide an Banner Image!')

        if (!banner_title) {
            throw new Error('Please Provide a Banner Title!');
        }

        checkValidStringType(banner_title)

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

        if(serachAllBanner.length <= 0){
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


exports.deletBanner = async (req, res, next) => {
    try {
        const {banner_id} = req.query

        let banner
        let find_banner
        if(banner_id){
            find_banner = await Banner.findOne({where: {banner_id}})

            if(!find_banner){
                throw new Error(`No Banner Availbale for Banner Id : ${banner_id}`)
            }
            
            banner = await Banner.destroy({where: {banner_id}})

            res.status(200).json({
                status: {
                    message: `Successfully Banner Delete for banner_id: ${banner_id}`,
                    code: 200,
                    error: false
                }
            })
        }else{
            find_banner = await Banner.findAll()

            if(find_banner.length === 0){
                throw new Error('No Banner Available!')
            }

            banner = await Banner.truncate()

            res.status(200).json({
                status: {
                    message: `Successfully All Banner Deleted!`,
                    code: 200,
                    error: false
                }
            })
        }
    } catch (error) {
        next(error)
    }
}