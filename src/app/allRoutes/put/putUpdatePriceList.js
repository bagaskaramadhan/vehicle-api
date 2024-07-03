const Pricelist = require("../../../model/modelPriceList");

exports.putUpdatePricelist = async (req, res) => {
    const id = req.params.id;
    const { code, price, year_id, model_id } = req.body;
    try {
        const pricelist = await Pricelist.findByPk(id);
        if (pricelist) {
            pricelist.code = !code ? pricelist.code : code;
            pricelist.price = !price ? pricelist.price : price;
            pricelist.year_id = !year_id ? pricelist.year_id : year_id;
            pricelist.model_id = !model_id ? pricelist.model_id : model_id;
            await pricelist.save();
            res.status(200).send(pricelist);
        } else {
            res.status(404).send({ message: "data not found" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};