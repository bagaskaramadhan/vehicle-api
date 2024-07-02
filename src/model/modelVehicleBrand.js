const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const config = require("../lib/config")
require("dotenv").config()


const VehicleBrand = sequelize.define("VehicleBrand", {
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcBrand
});

module.exports = VehicleBrand;