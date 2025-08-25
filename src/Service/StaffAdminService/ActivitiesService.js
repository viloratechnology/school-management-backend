const ActivitieModel = require("../../Model/StaffAdminModel/ActivitiesModel")

const addActivityService = async (ans) => {
    const data = await ActivitieModel.AddActivityModel(ans.Content, ans.Standard, ans.Section, ans.id, ans.Title, ans.Photo, ans.Photo)
    return data;
}

const getActivityService = async () => {
    const data = await ActivitieModel.getActivityModel()
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
}



module.exports = { addActivityService, getActivityService }