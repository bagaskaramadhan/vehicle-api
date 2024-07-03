const Pricelist = require("../../../model/modelPriceList");

exports.postCreatePricelist = async (req, res) => {
    const { code, price, year_id, model_id } = req.body;
    try {
        if (!code || !price || !year_id || !model_id) {
            return res.status(400).send({ message: "cannot be empty" });
        }
        const pricelist = await Pricelist.create({ code, price, year_id, model_id });
        res.status(200).send(pricelist);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};