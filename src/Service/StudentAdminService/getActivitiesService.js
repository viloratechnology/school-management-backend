const ActivitieModel = require("../../Model/StudentAdminModal/getActivitiesModel")


const getActivityService = async (id) => {

  const data = await ActivitieModel.getActivityModel(id);
  if (!data || data.length === 0) {
    return [];
  }
  let result = {}
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    let date = new Date(item.activities_date).toLocaleDateString()
    if (!result[date]) {
      result[date] = []
    }
    result[date].push({ title: item.title, content: item.content, std: item.std, section: item.section })
  }
  return result
};


module.exports = { getActivityService }