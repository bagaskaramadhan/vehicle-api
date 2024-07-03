const express = require("express");
const { verifyToken } = require("../helper/authenticateToken");
const { verifyAdmin } = require("../helper/authenticateAdmin");
const { postCreateVehicle } = require("./allRoutes/post/postCreateVehicle");
const { getAllVehicles } = require("./allRoutes/get/getAllVehicle");
const { getVehicleById } = require("./allRoutes/get/getVehicleById");
const { putUpdateVehicle } = require("./allRoutes/put/putUpdateVehicle");
const { deleteVehicle } = require("./allRoutes/delete/deleteVehicle");
const { postCreatePricelist } = require("./allRoutes/post/postPriceList");
const { postRegister } = require("./allRoutes/post/postRegister");
const { postLogin } = require("./allRoutes/post/postLogin");
const route = express.Router();
const path = "/api";

route
    // GET
    .get(`${path}/vehicle`, verifyToken, getAllVehicles)
    .get(`${path}/vehicle/:id`, verifyToken, getVehicleById)
    // POST
    .post(`${path}/vehicle`, verifyToken, verifyAdmin, postCreateVehicle)
    .post(`${path}/pricelist`, verifyToken, verifyAdmin, postCreatePricelist)
    .post(`${path}/register`, postRegister)
    .post(`${path}/login`, postLogin)
    // PUT
    .put(`${path}/vehicle/:id`, verifyToken, verifyAdmin, putUpdateVehicle)
    // DELETE
    .delete(`${path}/vehicle/:id`, verifyToken, verifyAdmin, deleteVehicle);

module.exports = route;
