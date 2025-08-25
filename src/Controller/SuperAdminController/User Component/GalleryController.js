const GalleryService = require("../../../Service/SuperAdminService/User Component/GalleryService");

const { errorResponse, successResponse } = require("../../../Utilities/ApiResponse");


const addGalleryController = (req, res) => {
  let files = req.files;
  try {
    const ans = GalleryService.addGalleryService(files);
    return res
      .status(201)
      .json(successResponse("Images Added successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to add", error));
  }
};

const getGalleryController = async (req, res) => {
  try {
    const data = await GalleryService.getGalleryService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

module.exports = { addGalleryController, getGalleryController };
