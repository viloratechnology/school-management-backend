const StandardModel = require("../../Model/SuperAdminModel/StandardModel")

const addStandardService = async (Loginans) => {
  const standard = await StandardModel.addStandardModel(Loginans.Standard, Loginans.id)
  return standard
}

const getStandardService = async () => {
  const data = await StandardModel.getStandardModel();
  return data;
};

const editStandardService = async (editans) => {
  const data = await StandardModel.editStandardModel(editans.Standard, editans.id, editans.updatedBy)
  return data;
}

const deleteStandardService=async(id)=>{
  const data = await StandardModel.deleteStandardModel(id)
  return data;
}

module.exports = { addStandardService, getStandardService, editStandardService, deleteStandardService}

