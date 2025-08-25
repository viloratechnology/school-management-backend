const userActivityService = require("../../../Service/SuperAdminService/UserComponent/UserActivityService");
const { errorResponse, successResponse } = require("../../../Utilities/ApiResponse");

const addActivityController = async (req, res) => {
  try {
    const body = req.body;
    const file = req.file;

    const img = file?.filename ? `/uploads/${file.filename}` : body.img;

    const data = await userActivityService.addActivityService({ ...body, img });
    return res
      .status(201)
      .json(successResponse("Activity added successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add Activity", error));
  }
};
const getActivityController = async (_req, res) => {
  try {
    const data = await userActivityService.getAllActivityService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const editActivityController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = req.file;
    const img = file?.filename ? `/uploads/${file.filename}` : body.img;

    const data = await userActivityService.editActivityService(id, {
      ...body,
      img,
    });
    return res
      .status(201)
      .json(successResponse("Activity edited successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to edit Activity", error));
  }
};

module.exports = {
  addActivityController,
  getActivityController,
  editActivityController,
};
