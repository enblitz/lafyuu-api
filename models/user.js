const { DataTypes } = require('sequelize')

const sequelize = require('../config/dbConnect')

const User = sequelize.define('user', {
  // Define user model fields here
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  // last_name: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
  },
  DOB: {
    type: DataTypes.STRING,
  },
  mobile_number: {
    type: DataTypes.STRING,
  },
  user_profile: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

module.exports = User
