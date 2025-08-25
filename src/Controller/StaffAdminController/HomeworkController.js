const HomeworkService = require('../../Service/StaffAdminService/HomeWorkService')
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');
const chunkDataConveter = require("../../Utilities/ChunksToData");


const addHomeworkController = async (req, res) => {

    try {
        const ans = await chunkDataConveter.parseRequestBody(req);
        HomeworkService.HomeworkService(ans)
        return res.status(201).json(successResponse("Add Home Work successfully ",ans));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Home Work Not Added",error));
    }
}

const getHomeworkController = async (req, res) => {
    try {
        await HomeworkService.getHomeworkService()
            .then((result) => {
                return res.status(200).json(successResponse("Get Home Work Successfully",{ data: result.getdata, date: result.datevalue }))
            })
    }
    catch (error) {
        return res.status(500).json(errorResponse("Home Work Not Get",error));
    }
};

const editHomeworkController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    await HomeworkService.editHomeworkService(ans);
    return res.status(200).json(successResponse("Homework Updated Successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Homework Update Failed", error));
  }
};


module.exports = { addHomeworkController, getHomeworkController,editHomeworkController }