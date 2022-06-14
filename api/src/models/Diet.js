const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('diet', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: false
    })
}