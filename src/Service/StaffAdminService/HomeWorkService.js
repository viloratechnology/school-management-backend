const HomeworkModel = require("../../Model/StaffAdminModel/HomeworkModel")
const { nanoid } = require("../../Utilities/NanoId")

const getHomeworkService = async () => {

        const getdata = await HomeworkModel.getHomeworkModel()
        if (!getdata || getdata.length === 0) {
                return { getdata: [], datevalue: null };
        }
        const date = getdata[0].homework_date
        const datevalue = date.toLocaleDateString()
        return { getdata, datevalue }

}

const HomeworkService = async (ans) => {

        const id = nanoid(10)
        const data = await HomeworkModel.AddHomeworkModel(id, ans.Content, ans.Title, ans.Standard, ans.Section, ans.Photo, ans.Photo, ans.id, ans.DueDate)
        return data;
}

const editHomeworkService = async (ans) => {
        const editData = await HomeworkModel.editHomeworkModel(ans.id, ans.Content, ans.Title, ans.Standard, ans.Section, ans.Photo, ans.Photo, ans.DueDate);
        return editData;
};

module.exports = { HomeworkService, getHomeworkService,editHomeworkService }