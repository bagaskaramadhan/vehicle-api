const VehicleModel = require("../../../model/modelVehicleModel");

exports.deleteVehicle = async (req, res) => {
    const id = req.params.id;
    try {
        const vehicle = await VehicleModel.findByPk(id);
        if (vehicle) {
            await vehicle.destroy();
            res.status(200).send("OK");
        } else {
            res.status(404).send({ message: "Vehicle not found" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};