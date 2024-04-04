const Category = require('../models/category')
const Main_Category = require('../models/main_category')
const { checkValidStringType } = require('../utils/validation')

exports.addCategory = async (req, res, next) => {
    try {
        const { category_name, parent_category_id } = req.body

        if(!req.file){
            throw new Error('Please Upload category Image!')
        }

        if (!category_name) throw new Error('Please Provide a Category Name!')
        checkValidStringType(category_name)

        const imagePath = req.file.path

        const main_category = await Main_Category.findOne({where: {parent_category_id}})

        if(!main_category){
            throw new Error('Please Provide valid Parent Ctagory id!')
        }

        const category = await Category.create({
            category_name,
            category_image: imagePath,
            parent_category_id
        })

        res.status(200).json({
            status: {
                message: "Successfully Category Added!",
                code: 200,
                error: false
            },
            data: {
                category
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.findAll()

        if (category.length === 0) throw new Error('No Category available!')

        res.status(200).json({
            status: {
                message: "Successfully Category Fetch!",
                code: 200,
                error: false
            },
            data: {
                category
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.deleteCategory = async (req, res, next) => {
    try {
        const { category_id } = req.query

        let category
        let find_category

        if (category_id) {
            find_category = await Category.findOne({ where: { category_id } })

            if (!find_category) {
                throw new Error(`No Category Avaiable for category id: ${category_id}`)
            }

            category = await Category.destroy({ where: { category_id } })

            res.status(200).json({
                status: {
                    message: `Successfully Category Delete for categoty_id: ${category_id}`,
                    code: 200,
                    error: false
                }
            })
        }else {
            find_category = await Category.findAll()

            if(find_category.length === 0){
                throw new Error('No Category Available!')
            }

            category = await Category.truncate()

            res.status(200).json({
                status: {
                    message: `Successfully All Category Deleted!`,
                    code: 200,
                    error: false
                }
            })
        }
    } catch (error) {
        next(error)
    }
} 