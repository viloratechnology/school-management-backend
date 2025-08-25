const SubjectModel = require("../../Model/SuperAdminModel/SubjectModel");

const addSubjectService = async (Loginans) => {
  const data = await SubjectModel.addSubjectModel(
    Loginans.Subject,
    Loginans.id
  );
  return data;
};

const getSubjectService = async () => {
  const data = await SubjectModel.getSubjectModel();
  return data;
};

const editSubjectService = async (editans) => {
  const data = await SubjectModel.editSubjectModel(
    editans.Subject,
    editans.id,
    editans.updatedBy
  );
  return data;
};

const deleteSubjectService = async (id) => {
  const data = await SubjectModel.deleteSubjectModel(id);
  return data;
};

module.exports = {
  addSubjectService,
  getSubjectService,
  editSubjectService,
  deleteSubjectService,
};
