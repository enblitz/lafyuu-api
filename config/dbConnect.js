const { Sequelize } = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_DB_SERVER,
  dialect: 'mysql',
  logging: false
})

// try {
//   sequelize.authenticate()
//   console.log('Connection has been established successfully.')
//   sequelize.sync()
//   console.log('All models synchronized successfully.')
// } catch (error) {
//   console.error('Unable to connect to the database:', error.message)
// }
sequelize.sync()

module.exports = sequelize