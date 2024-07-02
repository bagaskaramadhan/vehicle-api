const VehicleModel = require("../../../model/modelVehicleModel");

exports.putUpdateVehicle = async (req, res) => {
    const id = req.params.id;
    const { name, type_id } = req.body;
    try {
        const vehicle = await VehicleModel.findByPk(id);
        if (vehicle) {
            vehicle.name = name;
            vehicle.type_id = type_id;
            await vehicle.save();
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: "Vehicle not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};