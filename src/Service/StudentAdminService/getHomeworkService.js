const HOmeworkModel = require("../../Model/StudentAdminModal/getHomeworkModel")


const getHomeworkService = async (id) => {

  const data = await HOmeworkModel.getHomeworkModel(id);
  if (!data || data.length === 0) {
    return { data: [], datevalue: null };
  }
  const date = data[0].homework_date
  const datevalue = date.toLocaleDateString()
  return { data, datevalue }


};


module.exports = { getHomeworkService }