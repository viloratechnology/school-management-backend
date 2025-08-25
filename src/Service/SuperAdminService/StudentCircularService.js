const CircularModel = require("../../Model/SuperAdminModel/StudentCircularModel");
const StaffCircularService = require("../../Service/SuperAdminService/StaffCircularService");

const addStudentCircularService = async (Loginans) => {
  const Circular = await CircularModel.StudentCircularModel(
    Loginans.content,
    Loginans.title,
    Loginans.id
  );
  return Circular;
};

const getStudentCircularService = async () => {
  const data = await CircularModel.getStudentCircularModel();
  if (!data || data.length === 0) {
    return [];
  }
  let result = {};
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let date = new Date(item.circular_date).toLocaleDateString();
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push({ title: item.title, content: item.content });
  }
  return result;
};
const getallCircularService = async () => {
   const staff = await StaffCircularService.getStaffCircularService();
   const student = await getStudentCircularService ();
   console.log(staff,student)
   return staff,student
   };

// const getallCircularService = async () => {
//   const data = await CircularModel.getallCircularModel();
//   if (!data || data.length === 0) {
//     return [];
//   }
//   let result = {};
//   for (let i = 0; i < data.length; i++) {
//     let item = data[i];
//     let date = new Date(item.circular_date).toLocaleDateString();
//     if (!result[date]) {
//       result[date] = [];
//     }
//     result[date].push({ title: item.title, content: item.content });
//   }
//   return result;
// };

module.exports = {
  addStudentCircularService,
  getallCircularService,
  getStudentCircularService
};
