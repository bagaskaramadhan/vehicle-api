const { Op } = require("sequelize");
const VehicleBrand = require("../../../model/modelVehicleBrand");

exports.getAllVehicleBrand = async (req, res) => {
    try {
        let { page, limit, name } = req.query;
        const params = ["page", "limit", "name"];
        for (let param in req.query) {
            if (!params.includes(param)) {
                return res.status(400).send({ error: `Parameter "${param}" is not allowed` });
            }
        }
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const where = {};

        if (name) {
            where.name = { [Op.like]: `%${name}%` };
        }

        const queryOptions = {
            where,
            offset: (page - 1) * limit,
            limit: limit
        };

        const brands = await VehicleBrand.findAll(queryOptions);
        const totalCount = await VehicleBrand.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).send({
            data: brands,
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