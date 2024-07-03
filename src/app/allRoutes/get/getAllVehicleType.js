const { Op } = require("sequelize");
const VehicleType = require("../../../model/modelVehicleType");

exports.getAllVehicleType = async (req, res) => {
    try {
        let { page, limit, name, brand_id } = req.query;
        const params = ["page", "limit", "name", "brand_id"];
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

        if (brand_id) {
            where.brand_id = brand_id;
        }

        const queryOptions = {
            where,
            offset: (page - 1) * limit,
            limit: limit
        };

        const vehicleType = await VehicleType.findAll(queryOptions);
        const totalCount = await VehicleType.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).send({
            data: vehicleType,
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