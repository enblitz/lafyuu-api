const { DataTypes } = require('sequelize')

const sequelize = require('../config/dbConnect')

const Banner = sequelize.define('Banner', {
    banner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    banner_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner_countdown: {
        type: DataTypes.DATE,
        allowNull: false
    },
    countdown_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
        // allowNull: false
    },
    banner_status: {
        type: DataTypes.BOOLEAN,
        // allowNull: false
        defaultValue: true
    }
},{
    timestamps: false
})

module.exports = Banner