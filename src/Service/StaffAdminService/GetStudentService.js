const StudentModel=require("../../Model/StaffAdminModel/GetStudentModel")

const getStudentService = async (id) => {
      const data = await StudentModel.getStudentModel(id);
      if (!data || data.length === 0) {
        return data=[]
};
console.log(data,"ser")
return data;
}

module.exports={getStudentService}