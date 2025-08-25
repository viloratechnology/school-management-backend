const userHeroService = require("../../../Service/SuperAdminService/UserComponent/userHeroService");
const { errorResponse, successResponse } = require("../../../Utilities/ApiResponse");

const addHeroController = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;
    const heroBackground = files?.heroBackground?.[0]?.filename || null;
    const heroIcon = files?.heroIcon?.[0]?.filename || null;
    const data = await userHeroService.addHeroService(
      body,
      heroBackground,
      heroIcon
    );
    return res
      .status(201)
      .json(successResponse("Hero added successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add Hero", error));
  }
};

const getHeroController = async (req, res) => {
  try {
    const data = await userHeroService.getHeroService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    console.error("Get Heroes Error:", error);
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const editHeroController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const files = req.files;

    const heroBackground = files?.heroBackground?.[0]?.filename || null;
    const heroIcon = files?.heroIcon?.[0]?.filename || null;

    const data = await userHeroService.editHeroService(
      id,
      body,
      heroBackground,
      heroIcon
    );
    return res
      .status(201)
      .json(successResponse("Hero Edited successfully", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to edit Hero", error));
  }
};

module.exports = {
  addHeroController,
  getHeroController,
  editHeroController,
};
