const PeriodService = require("../../Service/SuperAdminService/PeriodService");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");
const chunkData = require("../../Utilities/ChunksToData");

const addPeriodController = async (req, res) => {
  try {
    const ans = await chunkData.parseRequestBody(req);
    PeriodService.addPeriodService(ans);
    return res
      .status(201)
      .json(successResponse("Period Added successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add Period",error));
  }
};

const getPeriodController = async (req, res) => {
  try {
    const data = await PeriodService.getPeriodService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data",error));
  }
};

const editPeriodController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    PeriodService.editPeriodService(editans);
    return res
      .status(201)
      .json(successResponse("Period edited successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to editing",error));
  }
};

module.exports = { addPeriodController, getPeriodController, editPeriodController };
