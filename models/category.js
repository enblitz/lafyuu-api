const { DataTypes } = require('sequelize')

const sequelize = require('../config/dbConnect')

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_status: {
        type: DataTypes.BOOLEAN,
        // allowNull: false
        defaultValue: true
    },
    parent_category_id: {
        type: DataTypes.INTEGER,
        // allowNull: false
      },
}, {
    timestamps: false
})

module.exports = Category