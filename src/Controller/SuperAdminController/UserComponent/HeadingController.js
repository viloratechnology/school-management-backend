const HeadingService = require("../../../Service/SuperAdminService/UserComponent/HeadingService");
const {
  successResponse,
  errorResponse,
} = require("../../../Utilities/ApiResponse");

const addHeadingController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;
    const data = await HeadingService.addHeadingService(body, file);
    return res
      .status(201)
      .json(successResponse("Header Created successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add Header", error));
  }
};

const getHeadingController = async (_req, res) => {
  try {
    const result = await HeadingService.getHeadingService();
    return res.status(200).json(successResponse("Data Recieved", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const editHeadingController = async (req, res) => {
  try {
    const {
      id,
      school_name,
      school_address,
      updated_by,
      photo_name: oldName,
      photo_path: oldPath,
    } = req.body;
    const photo_name = req.file?.originalname || oldName;
    const photo_path = req.file ? `/uploads/${req.file.filename}` : oldPath;

    const school = {
      id,
      photo_name,
      photo_path,
      school_name,
      school_address,
      updated_by,
    };

    const result = await HeadingService.editHeadingService(school);
    return res
      .status(201)
      .json(successResponse("Header Edited successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to editing", error));
  }
};

module.exports = {
  addHeadingController,
  getHeadingController,
  editHeadingController,
};
