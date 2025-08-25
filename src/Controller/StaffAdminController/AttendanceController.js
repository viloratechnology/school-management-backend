const AttendanceService = require('../../Service/StaffAdminService/AttendanceService')
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');
const chunkDataConveter = require("../../Utilities/ChunksToData");


const addAttendanceController = async (req, res) => {

    try {
        const ans = await chunkDataConveter.parseRequestBody(req);
        AttendanceService.AttendanceService(ans)
        return res.status(201).json(successResponse("Add Attendance Successfully",ans));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Attendance not submition",error));
    }

}
module.exports = { addAttendanceController }