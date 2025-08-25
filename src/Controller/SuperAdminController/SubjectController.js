const SubjectService = require('../../Service/SuperAdminService/SubjectService');
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');
const chunkDataConveter = require("../../Utilities/ChunksToData");


const addSubjectController = async (req, res) => {
    try {
        const data = await chunkDataConveter.parseRequestBody(req);
        await SubjectService.addSubjectService(data);
        return res.status(201).json(successResponse("Subject registered successfully.",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to register subject.",error));
    }
};

const getSubjectController = async (req, res) => {
    try {
        const data = await SubjectService.getSubjectService();
        return res.status(200).json(successResponse("Get Subject Data Successfully",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to retrieve subject data.",error));
    }
};

const editSubjectController = async (req, res) => {
    try {
        const data = await chunkDataConveter.parseRequestBody(req);
        await SubjectService.editSubjectService(data);
        return res.status(201).json(successResponse("Subject updated successfully.",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to update subject.",error));
    }
};

const deleteSubjectController = async (req, res) => {
  try {
  const id = req.params.id;
    const result = await SubjectService.deleteSubjectService(id);
    return res
      .status(201)
      .json(successResponse("Subject Deleted Successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete", error.message));
  }
};
module.exports = { addSubjectController, getSubjectController, editSubjectController, deleteSubjectController};
