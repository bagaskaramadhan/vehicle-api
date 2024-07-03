const VehicleBrand = require("../../../model/modelVehicleBrand");

exports.postCreateVehicleBrand = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).send({ message: "cannot be empty" });
        }
        const newVehicleBrand = await VehicleBrand.create({ name });
        res.status(200).send(newVehicleBrand);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};