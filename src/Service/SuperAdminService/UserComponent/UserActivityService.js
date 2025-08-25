const userActivityModel = require("../../../Model/SuperAdminModel/UserComponent/UserActivityModel");

const addActivityService = async (data) => {
  const result = await userActivityModel.addActivityModel(data);
  return result;
};

const getAllActivityService = async () => {
  const result = await userActivityModel.getAllActivityModel();
  return result;
};

const editActivityService = async (id, data) => {
  const result = await userActivityModel.editActivityModel(id, data);
  return result;
};

module.exports = {
  addActivityService,
  getAllActivityService,
  editActivityService,
};
