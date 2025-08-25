const ManagementModel = require("../../../Model/SuperAdminModel/User Component/ManagementModel");

const addManagementService = async (body, file) => {
  const result = await ManagementModel.addManagementModel(
    body.name,
    body.position,
    body.qualification,
    body.experience,
    body.email,
    body.phone,
    body.description,
    file.originalname,
    file.filename,
    body.create_by || "admin",
    body.update_by || "admin",
    body.linkedin
  );
  return result;
};

const getManagementService = async () => {
  const result = await ManagementModel.getManagementModel();
  return result;
};
module.exports = { addManagementService, getManagementService };
