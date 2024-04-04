const { DataTypes } = require('sequelize')

const sequelize = require('../config/dbConnect')
const User = require('./user')

const Token = sequelize.define('loginUser', {
  // Define user model fields here
  token_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    // allowNull: false
  },
  active_token: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

User.hasOne(Token, {foreignKey: 'user_id'})
Token.belongsTo(User, {foreignKey: 'user_id'})

module.exports = Token
