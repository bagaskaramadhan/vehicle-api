const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const config = require("../lib/config")
require("dotenv").config()

const VehicleYear = sequelize.define("VehicleYear", {
    year: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcYear
});

module.exports = VehicleYear;