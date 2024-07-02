const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const vehicleType = require("./modelVehicleType");
const config = require("../lib/config")
require("dotenv").config()


const VehicleModel = sequelize.define("VehicleModel", {
    name: { type: DataTypes.STRING, allowNull: false },
    type_id: {
        type: DataTypes.INTEGER,
        references: { model: vehicleType, key: "id" },
        allowNull: false
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcModel
});

VehicleModel.belongsTo(vehicleType, { foreignKey: "type_id" });

module.exports = VehicleModel;