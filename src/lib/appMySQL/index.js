const { Sequelize } = require("sequelize");
const config = require("../config/index")

require("dotenv").config()

const sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
    host: config.dbHost,
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;