const VehicleModel = require("../../../model/modelVehicleModel");

exports.postCreateVehicle = async (req, res) => {
    const { name, type_id } = req.body;
    try {
        if (!name || !type_id) {
            return res.status(400).send({ message: "cannot be empty" });
        }
        const newVehicle = await VehicleModel.create({ name, type_id });
        res.status(200).send(newVehicle);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};