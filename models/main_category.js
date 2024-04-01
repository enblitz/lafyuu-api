const { DataTypes } = require('sequelize')

const sequelize = require('../config/dbConnect')
const Category = require('./category')

const Main_Category = sequelize.define('Main_Category', {
    parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    parent_category_name: {
        type: DataTypes.ENUM('Man Fashion', 'Woman Fashion'),
        allowNull: false
    }
},{
    timestamps: false
})

Category.belongsTo(Main_Category, {foreignKey: 'parent_category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Main_Category.hasMany(Category, {foreignKey: 'parent_category_id',  onDelete: 'CASCADE', onUpdate: 'CASCADE'})

module.exports = Main_Category