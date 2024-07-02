const express = require("express");
const { postCreateVehicle } = require("./allRoutes/post/postCreateVehicle");
const { getAllVehicles } = require("./allRoutes/get/getAllVehicle");
const { getVehicleById } = require("./allRoutes/get/getVehicleById");
const { putUpdateVehicle } = require("./allRoutes/put/putUpdateVehicle");
const { deleteVehicle } = require("./allRoutes/delete/deleteVehicle");
const { postCreatePricelist } = require("./allRoutes/post/postPriceList");
const route = express.Router();
const path = "/api";

route
    // GET
    .get(`${path}/vehicle`, getAllVehicles)
    .get(`${path}/vehicle/:id`, getVehicleById)
    // POST
    .post(`${path}/vehicle`, postCreateVehicle)
    .post(`${path}/pricelist`, postCreatePricelist)
    // PUT
    .put(`${path}/vehicle/:id`, putUpdateVehicle)
    // DELETE
    .delete(`${path}/vehicle/:id`, deleteVehicle);

module.exports = route;
