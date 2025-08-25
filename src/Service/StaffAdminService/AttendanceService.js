const AttendanceModel = require("../../Model/StaffAdminModel/AttendanceModel")

const AttendanceService = async (ans) => {
    const data = await AttendanceModel.AttendanceModel(ans)
    return data;
}

module.exports = { AttendanceService }