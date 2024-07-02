const { Op } = require("sequelize");
const VehicleBrand = require("../../../model/modelVehicleBrand");
const VehicleModel = require("../../../model/modelVehicleModel");
const VehicleType = require("../../../model/modelVehicleType");

exports.getAllVehicles = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const queryOptions = {
            include: [
                { model: VehicleType, include: [VehicleBrand] }
            ],
            offset: (page - 1) * limit,
            limit: limit
        };

        const vehicles = await VehicleModel.findAll(queryOptions);
        const totalCount = await VehicleModel.count(queryOptions);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            data: vehicles,
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