const StandardService = require('../../Service/SuperAdminService/StandardService');
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');
const ChunksToData=require("../../Utilities/ChunksToData")

const addStandardController = async (req, res) => {
  try {
    const data = await ChunksToData.parseRequestBody(req);
   const result= await StandardService.addStandardService(data);
    return res.status(201).json(successResponse("Standard registered successfully.",result));
  }
  catch (error) {
    return res.status(500).json(errorResponse("Standard may already exist or failed to register.",error.message));
  }
};

const getStandardController = async (req, res) => {
  try {
    const data = await StandardService.getStandardService();
    return res.status(200).json(successResponse("Get Standard Data Successfully",data));
  }
  catch (error) {
    return res.status(500).json(errorResponse("Standard Not Get",error));
  }
};

const editStandardController = async (req, res) => {
  try {
    const data = await ChunksToData.parseRequestBody(req);
    const result=await StandardService.editStandardService(data);
    return res.status(201).json(successResponse("Standard information updated successfully.",result));
  }
  catch (error) {
    return res.status(500).json(errorResponse("Failed to update standard.",error.message));
  }
};


const deleteStandardController = async (req, res) => {
  try {
  const id = req.params.id;
    const result = await StandardService.deleteStandardService(id);
    return res
      .status(201)
      .json(successResponse("Standard Deleted Successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete", error.message));
  }
};
module.exports = { addStandardController, getStandardController, editStandardController,deleteStandardController };
