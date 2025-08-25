const CalenderService = require("../../Service/SuperAdminService/CalenderService");
const {
  errorResponse,
  successResponse,
} = require("../../Utilities/ApiResponse");
const chunkDataConveter = require("../../Utilities/ChunksToData");

const addCalenderController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    CalenderService.addCalenderService(ans);
    return res
      .status(201)
      .json(successResponse("Event Added successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add event",error));
  }
};

const getCalenderController = async (req, res) => {
  try {
    const data = await CalenderService.getCalenderService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data",error));
  }
};

module.exports = { addCalenderController, getCalenderController };
