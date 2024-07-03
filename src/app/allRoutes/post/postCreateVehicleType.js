const VehicleType = require("../../../model/modelVehicleType");

exports.postCreateVehicleType = async (req, res) => {
    const { name, brand_id } = req.body;
    try {
        if (!name || !brand_id) {
            return res.status(400).send({ message: "cannot be empty" });
        }
        const newVehicleType = await VehicleType.create({ name, brand_id });
        res.status(200).send(newVehicleType);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};