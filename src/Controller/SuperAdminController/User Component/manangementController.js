const ManagementService = require("../../../Service/SuperAdminService/User Component/ManagementService");
const {
  errorResponse,
  successResponse,
} = require("../../../Utilities/ApiResponse");

const addMemberController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    const data = await ManagementService.addManagementService(body, file);
    return res.status(201).json(successResponse("Created successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to Created", error.message));
  }
};

const getAllMemberController = async (req, res) => {
  try {
    const result = await ManagementService.getManagementService();
    return res.status(200).json(successResponse("Data Recieved", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

module.exports = { addMemberController, getAllMemberController };
