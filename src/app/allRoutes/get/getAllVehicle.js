const { Op } = require("sequelize");
const VehicleBrand = require("../../../model/modelVehicleBrand");
const VehicleModel = require("../../../model/modelVehicleModel");
const VehicleType = require("../../../model/modelVehicleType");

exports.getAllVehicles = async (req, res) => {
    try {
        let { page, limit, name, type_id } = req.query;
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
            include: [
                { model: VehicleType, include: [VehicleBrand] },
            ],
            offset: (page - 1) * limit,
            limit: limit
        };

        const vehicles = await VehicleModel.findAll(queryOptions);
        const totalCount = await VehicleModel.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        let result = [];
        await vehicles.map((item) => {
            result.push(
                {
                    id: item.dataValues.id,
                    name: item.dataValues.name,
                    type_id: item.dataValues.type_id,
                    created_at: item.dataValues.created_at,
                    updated_at: item.dataValues.updated_at,
                }
            );
    });

    res.status(200).json({
        data: result,
        metadata: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            itemsPerPage: limit
        }
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};