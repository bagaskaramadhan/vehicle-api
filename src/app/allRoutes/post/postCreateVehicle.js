const VehicleModel = require("../../../model/modelVehicleModel");

exports.postCreateVehicle = async (req, res) => {
    const { name, type_id } = req.body;
    try {
        const newVehicle = await VehicleModel.create({ name, type_id });
        res.status(200).json(newVehicle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};