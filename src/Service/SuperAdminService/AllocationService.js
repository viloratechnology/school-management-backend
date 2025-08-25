const AllocationModel = require("../../Model/SuperAdminModel/AllocationModel");

const addAllocationService = async (Loginans) => {
  const data = await AllocationModel.addAllocationModel(
    Loginans.Class,
    Loginans.Section,
    Loginans.Staff,
    Loginans.id,
    Loginans.Subject,
    Loginans.Role
  );
  return data;
};

const getAllocationService = async () => {
  const data = await AllocationModel.getAllocationModel();
  if (!data || data.length === 0) {
    return (data = []);
  }
  return data;
};

const getStaffBySubjectService = async (id) => {
  let data = await AllocationModel.getStaffBySubjectModel(id);
  if (!data || data.length === 0) {
    return (data = []);
  }
  return data;
};

const editAllocationService = async (ans) => {
  const data = await AllocationModel.editAllocationModel(
    ans.id,
    ans.Class,
    ans.Section,
    ans.Staff,
    ans.id,
    ans.Subject
  );
  console.log(data,"ser")
  return data;
};

const deleteAllocationService = async (id) => {
  const data = await AllocationModel.deleteAllocationModel(id);
  console.log(data, "Ser");
  return data;
};

module.exports = {
  addAllocationService,
  getAllocationService,
  getStaffBySubjectService,
  editAllocationService,
  deleteAllocationService,
};
