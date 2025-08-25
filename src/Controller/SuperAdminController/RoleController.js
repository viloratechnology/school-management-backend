const RoleService = require("../../Service/SuperAdminService/RoleService");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");
const chunkDataConveter = require("../../Utilities/ChunksToData");

const addRoleController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    RoleService.addRoleService(ans);
    return res
      .status(201)
      .json(successResponse("Role Created successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to Create Role",error));
  }
};

const getRoleController = async (req, res) => {
  try {
    const data = await RoleService.getRoleService();
    return res
      .status(200)
      .json(successResponse("Data Received", data));
  } catch (error) {
     return res.status(500).json(errorResponse("Error Retrieving Data",error));
  }
};

const editRoleController = async (req, res) => {
  try {
    const ans = await chunkDataConveter.parseRequestBody(req);
    RoleService.editRoleService(ans);
    return res
      .status(201)
      .json(successResponse("Role Allocated successfully", ans));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to editing",error));
  }
};

const deleteRoleController = async (req, res) => {
  try {
  const id = req.params.id;
    const result = await RoleService.deleteRoleService(id);
    return res
      .status(201)
      .json(successResponse("Role Deleted Successfully", result));
  } catch (error) {
    return res.status(500).json(errorResponse("Failed to delete", error.message));
  }
};
module.exports = { addRoleController, getRoleController, editRoleController,deleteRoleController };
