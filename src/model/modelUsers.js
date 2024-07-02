const { DataTypes } = require("sequelize");
const sequelize = require("../lib/appMySQL/index");
const config = require("../lib/config")
require("dotenv").config()


const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: config.vcUsers
});

module.exports = User;