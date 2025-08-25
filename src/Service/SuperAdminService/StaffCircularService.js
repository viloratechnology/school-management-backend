const StaffCircularModel = require("../../Model/SuperAdminModel/StaffCircularModel");

const addStaffCircularService = async (ans) => {
  const Circular = await StaffCircularModel.addStaffCircularModel(
    ans.content,
    ans.title,
    ans.id
  );
  return Circular;
};

const getStaffCircularService = async () => {
  const data = await StaffCircularModel.getStaffCircularModel();
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

module.exports = { addStaffCircularService,getStaffCircularService };
