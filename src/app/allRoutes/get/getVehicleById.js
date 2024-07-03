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
            const result = {
                id: vehicle.id,
                name:vehicle.name,
                type_id: vehicle.type_id,
                created_at: vehicle.created_at,
                updated_at: vehicle.updated_at
            };
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};