const SectionModel = require("../../Model/SuperAdminModel/SectionModel")

const addSectionService = async (Loginans) => {
  await SectionModel.addSectionModel(Loginans.Section, Loginans.id)
}


const getSectionService = async () => {
  const data = await SectionModel.getSectionModel();
  return data;
}

const editSectionService = async (editans) => {
  const data = await SectionModel.editSectionModel(editans.Section, editans.id, editans.updatedBy)
  return data;
}

const deleteSectionService = async (id) => {
  const data = await SectionModel.deleteSectionModel(id);
  return data;
}

module.exports = { addSectionService, getSectionService, editSectionService,deleteSectionService }

