const TopperService = require("../../../Service/SuperAdminService/User Component/UserToppersService");
const {
  successResponse,
  errorResponse,
} = require("../../../Utilities/ApiResponse");

const addTopperController = (req, res) => {
  let body = req.body;
  let files = req.file;
  try {
    const data = TopperService.addTopperService(body, files);
    return res
      .status(201)
      .json(successResponse("Data added successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add data", error));
  }
};

const getTopperController = async (req, res) => {
  try {
    const data = await TopperService.getTopperService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const editTopperController = async (req, res) => {
  let body = req.body;
  let files = req.file;
  try {
    const data = await TopperService.editTopperService(
      body,
      files ? files.filename : null
    );
    return res
      .status(201)
      .json(successResponse("Data edited successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to edit data", error));
  }
};

module.exports = {
  addTopperController,
  getTopperController,
  editTopperController,
};
