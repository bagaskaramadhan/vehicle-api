const Pricelist = require("../../../model/modelPriceList");

exports.postCreatePricelist = async (req, res) => {
    const { code, price, year_id, model_id } = req.body;
    try {
        const pricelist = await Pricelist.create({ code, price, year_id, model_id });
        res.status(200).json(pricelist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};