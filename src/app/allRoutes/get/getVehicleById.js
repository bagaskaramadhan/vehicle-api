const VehicleBrand = require("../../../model/modelVehicleBrand");
const VehicleModel = require("../../../model/modelVehicleModel");
const VehicleType = require("../../../model/modelVehicleType");


exports.getVehicleById = async (req, res) => {
    const id = req.params.id;
    try {
        const vehicle = await VehicleModel.findByPk(id, {
            include: [{ model: VehicleType, include: [VehicleBrand] }]
        });
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};