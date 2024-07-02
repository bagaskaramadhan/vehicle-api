const dotenv = require("dotenv");
dotenv.config();

module.exports = Config = {
    dbHost: process.env.DBHOST || "",
    dbUsername: process.env.DBUSER || "",
    dbName: process.env.DBNAME || "",
    dbPassword: process.env.DBPASS || "",
    dbDialect: process.env.DBMS || "",
    port: process.env.PORT || "",
    vcUsers: process.env.USERS || "",
    vcBrand: process.env.BRAND || "",
    vcType: process.env.TYPE || "",
    vcYear: process.env.YEAR || "",
    vcModel: process.env.MODEL || "",
    vcPrice: process.env.PRICE || "",
    tokenKey: process.env.TOKENKEY || ""
};