const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./lib/appMySQL/index");
const routes = require("./app/appRoutes")
const config = require("./lib/config")
require("dotenv").config()

const app = express();
app.use(bodyParser.json());

app.use("/", routes);

sequelize.sync().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
}).catch(err => console.log(err));