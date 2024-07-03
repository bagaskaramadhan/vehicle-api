const Pricelist = require("../../../model/modelPriceList");

exports.deletePricelist = async (req, res) => {
    const id = req.params.id;
    try {
        const pricelist = await Pricelist.findByPk(id);
        if (pricelist) {
            await pricelist.destroy();
            res.status(200).send("OK");
        } else {
            res.status(404).send({ message: "data not found" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};