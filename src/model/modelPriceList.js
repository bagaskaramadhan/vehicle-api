const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const vehicleModel = require("./modelVehicleModel");
const vehicleYear = require("./modelVehicleYear");
const config = require("../lib/config")
require("dotenv").config()


const Pricelist = sequelize.define("Pricelist", {
    code: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    year_id: {
        type: DataTypes.INTEGER,
        references: { model: vehicleYear, key: "id" },
        allowNull: false
    },
    model_id: {
        type: DataTypes.INTEGER,
        references: { model: vehicleModel, key: "id" },
        allowNull: false
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcPrice
});

Pricelist.belongsTo(vehicleYear, { foreignKey: "year_id" });
Pricelist.belongsTo(vehicleModel, { foreignKey: "model_id" });

module.exports = Pricelist;