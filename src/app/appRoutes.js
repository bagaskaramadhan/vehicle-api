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
const { postCreateVehicleBrand } = require("./allRoutes/post/postCreateVehicleBrand");
const { postCreateVehicleType } = require("./allRoutes/post/postCreateVehicleType");
const { postCreateVehicleYear } = require("./allRoutes/post/postCreateVehicleYear");
const { getAllVehicleBrand } = require("./allRoutes/get/getAllVehicleBrand");
const { getAllVehicleType } = require("./allRoutes/get/getAllVehicleType");
const { getAllPricelist } = require("./allRoutes/get/getAllPriceList");
const { deletePricelist } = require("./allRoutes/delete/deletePriceList");
const { putUpdatePricelist } = require("./allRoutes/put/putUpdatePriceList");

const route = express.Router();
const path = "/api";

route
    // GET
    .get(`${path}/vehicle`, verifyToken, getAllVehicles)
    .get(`${path}/vehicle/:id`, verifyToken, getVehicleById)
    .get(`${path}/vehicle-brand`, verifyToken, getAllVehicleBrand)
    .get(`${path}/vehicle-type`, verifyToken, getAllVehicleType)
    .get(`${path}/pricelist`, verifyToken, getAllPricelist)
    // POST
    .post(`${path}/vehicle`, verifyToken, verifyAdmin, postCreateVehicle)
    .post(`${path}/pricelist`, verifyToken, verifyAdmin, postCreatePricelist)
    .post(`${path}/vehicle-brand`, verifyToken, verifyAdmin, postCreateVehicleBrand)
    .post(`${path}/vehicle-type`, verifyToken, verifyAdmin, postCreateVehicleType)
    .post(`${path}/vehicle-year`, verifyToken, verifyAdmin, postCreateVehicleYear)
    .post(`${path}/register`, postRegister)
    .post(`${path}/login`, postLogin)
    // PUT
    .put(`${path}/vehicle/:id`, verifyToken, verifyAdmin, putUpdateVehicle)
    .put(`${path}/pricelist/:id`, putUpdatePricelist)
    // DELETE
    .delete(`${path}/vehicle/:id`, verifyToken, verifyAdmin, deleteVehicle)
    .delete(`${path}/pricelist/:id`,verifyToken, verifyAdmin, deletePricelist);

module.exports = route;
