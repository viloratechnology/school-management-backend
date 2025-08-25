const ActivitiesService = require('../../Service/StaffAdminService/ActivitiesService')
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');
const chunkDataConveter = require("../../Utilities/ChunksToData");

const addActivityController = async (req, res) => {

    try {
        const ans = await chunkDataConveter.parseRequestBody(req);
       const result= ActivitiesService.addActivityService(ans)
        return res.status(201).json(successResponse("Add Activitie data",result));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Error retrieving data",error));
    }

}
const getActivityController = async (req, res) => {
    try {
        const data = await ActivitiesService.getActivityService();
        return res.status(200).json(successResponse("Get Activite data",data))
    }
    catch (error) {
        return res.status(500).json(errorResp("Error retrieving data",error));
    }
};

module.exports = { addActivityController, getActivityController }