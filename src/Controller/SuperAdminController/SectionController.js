const SectionService = require("../../Service/SuperAdminService/SectionService");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");
const ChunksToData = require("../../Utilities/ChunksToData");

const addSectionController = async (req, res) => {
  try {
    const data = await ChunksToData.parseRequestBody(req);
    const result = await SectionService.addSectionService(data);
    return res
      .status(201)
      .json(successResponse("Section Added Successfull", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Section Not Added", error.message));
  }
};

const getSectioController = async (req, res) => {
  try {
    const data = await SectionService.getSectionService();
    return res
      .status(200)
      .json(successResponse("Section Get Successfully ", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Section Data Not Get", error));
  }
};

const editSectionController = async (req, res) => {
  try {
    const data = await ChunksToData.parseRequestBody(req);
    const result = await SectionService.editSectionService(data);
    return res
      .status(201)
      .json(successResponse("Section Edited Successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to Edit Section", error));
  }
};


const deleteSectionController = async (req, res) => {
  try {
  const id = req.params.id;
    const result = await SectionService.deleteSectionService(id);
    return res
      .status(201)
      .json(successResponse("Section Deleted Successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete", error.message));
  }
};

module.exports = {
  addSectionController,
  getSectioController,
  editSectionController,
  deleteSectionController
};
