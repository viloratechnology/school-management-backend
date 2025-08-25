const AllocationService = require("../../Service/SuperAdminService/AllocationService");
const {
  errorResponse,
  successResponse,
} = require("../../Utilities/ApiResponse");
const chunkDataConveter = require("../../Utilities/ChunksToData");

const addAllocationController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    AllocationService.addAllocationService(ans);
    return res
      .status(201)
      .json(successResponse("Staff Allocated successfully", ans));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to allocate staff", error));
  }
};

const getAllocationController = async (req, res) => {
  try {
    const data = await AllocationService.getAllocationService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res.status(500).json(errorResponse("Error Retrieving Data", error));
  }
};

const getStaffBySubjectController = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await AllocationService.getStaffBySubjectService(id);
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Error Retrieving Data", error.message));
  }
};

const editAllocationController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    console.log(ans,"con")
    const result = AllocationService.editAllocationService(ans);
    return res.status(201).json(successResponse("Edited successfully", result));
  } catch (error) {
    console.log(error,"conr")
    return res
      .status(500)
      .json(errorResponse("Failed to editing allocate", error));
  }
};

const deleteAllocationController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AllocationService.deleteAllocationService(id);
    return res
      .status(201)
      .json(successResponse("Allocation Deleted Successfully", result));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to delete", error.message));
  }
};
module.exports = {
  addAllocationController,
  getAllocationController,
  editAllocationController,
  deleteAllocationController,
  getStaffBySubjectController,
};
