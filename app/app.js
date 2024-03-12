const express = require('express')
const sequelize = require('../config/dbConnect')
const userRouter = require('../router/userRouter')

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
                message: "Success",
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

module.exports = app