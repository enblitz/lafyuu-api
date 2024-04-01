const Main_Category = require('../models/main_category')
const { checkValidStringType } = require('../utils/validation')

exports.add_main_category = async (req, res, next) => {
    try {
        const {parent_category_name} = req.body

        if(!parent_category_name){
            throw new ErrorO('Please Provide Main category Name!')
        }

        checkValidStringType(parent_category_name)

        const Parent_Category = await Main_Category.create({
            parent_category_name
        })

        res.status(200).json({
            status: {
                message: "Successfully Main Category Added!",
                code: 200,
                error: false
            },
            data: {
                Parent_Category
            }
        })
    } catch (error) {
        next(error)
    }
}