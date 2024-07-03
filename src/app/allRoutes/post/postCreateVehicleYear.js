const VehicleYear = require("../../../model/modelVehicleYear");

exports.postCreateVehicleYear = async (req, res) => {
    const { year } = req.body;
    try {
        if (!year) {
            return res.status(400).send({ message: "cannot be empty" });
        }
        const newVehicleYear = await VehicleYear.create({ year });
        res.status(200).send(newVehicleYear);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};