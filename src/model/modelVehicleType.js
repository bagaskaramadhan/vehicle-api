const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const vehicleBrand = require("./modelVehicleBrand");
const config = require("../lib/config")
require("dotenv").config()


const VehicleType = sequelize.define("VehicleType", {
    name: { type: DataTypes.STRING, allowNull: false },
    brand_id: {
        type: DataTypes.INTEGER,
        references: { model: vehicleBrand, key: "id" },
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcType
});

VehicleType.belongsTo(vehicleBrand, { foreignKey: "brand_id" });

module.exports = VehicleType;