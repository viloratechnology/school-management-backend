const ClassTeacherAllocationModel=require("../../Model/SuperAdminModel/ClassTeacherAllocationModel")

const addClassTeacherAllocationService = async (Loginans) => {
  const data = await ClassTeacherAllocationModel.addClassTeacherAllocationModel(
    Loginans.Staff,
    Loginans.Role,
    Loginans.Class,
    Loginans.Section,
    Loginans.id
  );
  return data;
};

const getClassTeacherAllocationService = async () => {
  const data = await ClassTeacherAllocationModel.getClassTeacherAllocationModel();
  if (!data || data.length === 0) {
    return (data = []);
  }
  return data;
};

const editClassTeacherAllocationService = async (Loginans) => {
  const data = await ClassTeacherAllocationModel.editClassTeacherAllocationModel(
    Loginans.id,
   Loginans.Staff,
    Loginans.Role,
    Loginans.Class,
    Loginans.Section,
    Loginans.id
  );
  console.log(data,"ser")
  return data;
};

const deleteClassTeacherAllocationService = async (id) => {
  const data = await ClassTeacherAllocationModel.deleteClassTeacherAllocationModel(id);
  console.log(data, "Ser");
  return data;
};

module.exports={addClassTeacherAllocationService,getClassTeacherAllocationService,editClassTeacherAllocationService,deleteClassTeacherAllocationService}