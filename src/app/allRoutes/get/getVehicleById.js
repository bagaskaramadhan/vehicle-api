const VehicleBrand = require("../../../model/modelVehicleBrand");
const VehicleModel = require("../../../model/modelVehicleModel");
const VehicleType = require("../../../model/modelVehicleType");


exports.getVehicleById = async (req, res) => {
    const id = req.params.id;
    try {
        const vehicle = await VehicleModel.findByPk(id);
        if (vehicle) {
            res.status(200).send(vehicle);
        } else {
            res.status(404).send({ message: "Vehicle not found" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};