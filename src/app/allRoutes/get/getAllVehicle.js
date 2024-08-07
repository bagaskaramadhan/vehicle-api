const { Op } = require("sequelize");
const VehicleModel = require("../../../model/modelVehicleModel");

exports.getAllVehicles = async (req, res) => {
    try {
        let { page, limit, name, type_id } = req.query;
        const params = ["page", "limit", "name", "type_id"];
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

        if (type_id) {
            where.type_id = type_id;
        }

        const queryOptions = {
            where,
            offset: (page - 1) * limit,
            limit: limit
        };

        const vehicles = await VehicleModel.findAll(queryOptions);
        const totalCount = await VehicleModel.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).send({
            data: vehicles,
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