const Category = require('../models/category')
const { checkValidStringType } = require('../utils/validation')

exports.addCategory = async (req, res, next) => {
    try {
        const { category_name } = req.body

        if (!category_name) throw new Error('Please Provide a Category Name!')
        checkValidStringType(category_name)

        const category = await Category.create({
            category_name
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

        if (category.length < 0) throw new Error('No Category available!')

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