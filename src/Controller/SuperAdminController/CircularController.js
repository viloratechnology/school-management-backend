const StaffCircularService = require("../../Service/SuperAdminService/StaffCircularService");
const StudentCircularService = require("../../Service/SuperAdminService/StudentCircularService");
const chunkDataConveter = require("../../Utilities/ChunksToData");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");

const addCircularController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    if (ans.Type == "Staff") {
      await StaffCircularService.addStaffCircularService(ans);
      return res
        .status(201)
        .json(successResponse("Circular Sent successfully", ans));
    } else if (ans.Type == "Student") {
      await StudentCircularService.addStudentCircularService(ans);
      return res
        .status(201)
        .json(successResponse("Circular Sent successfully", ans));
    } else {
      await StaffCircularService.addStaffCircularService(ans);
      await StudentCircularService.addStudentCircularService(ans);
    }
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to sent Circular", error));
  }
};


const getStaffCircularController = async (req, res) => {
  try {
    const getdata = await StaffCircularService.getStaffCircularService();
    return res.status(200).json(successResponse("Data Recieved", getdata));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const getStudentCircularController = async (req, res) => {
  try {
    const getdata = await StudentCircularService.getStudentCircularService();
    return res.status(200).json(successResponse("Data Recieved", getdata));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const getallCircularController = async (req, res) => {
  try {
    const getdata = await StudentCircularService.getallCircularService();
    return res.status(200).json(successResponse("Data Recieved", getdata));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

module.exports = { addCircularController, getallCircularController ,getStaffCircularController,getStudentCircularController};
