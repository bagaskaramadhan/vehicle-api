const { Op } = require("sequelize");
const Pricelist = require("../../../model/modelPriceList");

exports.getAllPricelist = async (req, res) => {
    try {
        let { page, limit, code, price, year_id, model_id } = req.query;
        const params = ["page", "limit", "code", "price", "year_id", "model_id"];
        for (let param in req.query) {
            if (!params.includes(param)) {
                return res.status(400).send({ error: `Parameter "${param}" is not allowed` });
            }
        }

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const where = {};

        if (code) {
            where.code = { [Op.like]: `%${code}%` };
        }

        if (price) {
            where.price = price;
        }

        if (year_id) {
            where.year_id = year_id;
        }
        
        if (model_id) {
            where.model_id = model_id;
        }

        console.log(req.query)

        const queryOptions = {
            where,
            offset: (page - 1) * limit,
            limit: limit
        };

        const pricelist = await Pricelist.findAll(queryOptions);
        const totalCount = await Pricelist.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).send({
            data: pricelist,
            metadata: {
                totalItems: totalCount,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};