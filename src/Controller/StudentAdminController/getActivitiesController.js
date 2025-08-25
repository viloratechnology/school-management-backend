const ActivityService = require("../../Service/StudentAdminService/getActivitiesService");
const { successResponse, errorResponse } = require("../../Utilities/ApiResponse");

const getActivityController = async (req, res) => {
    try {
        const id = req.params["id"];
        const data = await ActivityService.getActivityService(id);
        return res.status(200).json(successResponse("Get Activite Data Successfully",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Activite Not Get",error));
    }
};

module.exports = { getActivityController };
