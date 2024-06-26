const express = require('express')
const sequelize = require('../config/dbConnect')
const userRouter = require('../router/userRouter')
const bannerRouer = require('../router/banner')
const categoryRouter = require('../router/category')
const main_categoryRouter = require('../router/main_category')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'welcome!'
    })
})

app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        console.log('All models synchronized successfully.')
        res.status(200).json({
            status: {
                message: "Connection has been established successfully.",
                code: 200,
                error: false
            }
        })
    } catch (error) {
        res.status(400).json({
            status: {
                message: `${error}`,
                code: 400,
                error: true
            }
        })
    }
})

app.use(userRouter)
app.use(bannerRouer)
app.use(categoryRouter)
app.use(main_categoryRouter)

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 400;
    error.message = error.message || "Error";
    res.status(error.statusCode).json({
        status: {
            message: error.message,
            code: error.statusCode,
            error: true
        }
    });
});


module.exports = app