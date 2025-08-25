const ClassTeacherAllocationService=require("../../Service/SuperAdminService/ClassTeacherAllocationService")

const {
  errorResponse,
  successResponse,
} = require("../../Utilities/ApiResponse");
const chunkDataConveter = require("../../Utilities/ChunksToData");

const addClassTeacherAllocationController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    console.log(ans,"contr")
    ClassTeacherAllocationService.addClassTeacherAllocationService(ans);
    return res
      .status(201)
      .json(successResponse("Staff Allocated successfully", ans));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to allocate staff", error));
  }
};

const getClassTeacherAllocationController = async (req, res) => {
  try {
    const data = await ClassTeacherAllocationService.getClassTeacherAllocationService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const editClassTeacherAllocationController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    console.log(ans,"con")
    const result = ClassTeacherAllocationService.editClassTeacherAllocationService(ans);
    return res.status(201).json(successResponse("Edited successfully", result));
  } catch (error) {
    console.log(error,"conr")
    return res
      .status(500)
      .json(errorResponse("Failed to editing allocate", error));
  }
};

const deleteClassTeacherAllocationController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ClassTeacherAllocationService.deleteClassTeacherAllocationService(id);
    return res
      .status(201)
      .json(successResponse("Allocation Deleted Successfully", result));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to delete", error.message));
  }
};

module.exports={addClassTeacherAllocationController,getClassTeacherAllocationController,editClassTeacherAllocationController,deleteClassTeacherAllocationController}