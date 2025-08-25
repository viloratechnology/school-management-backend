const AttendanceService = require("../../Service/StudentAdminService/getAttendanceService");
const { successResponse, errorResponse } = require("../../Utilities/ApiResponse");

const getAttendanceController = async (req, res) => {
    try {
        const id = req.params["id"];
        const data = await AttendanceService.getAttendanceService(id);
        return res.status(200).json(successResponse("Get Attedance Data Successfully",data));
    } 
    catch (error) {
        return res.status(500).json(errorResponse("Attedance Not Get",error));
    }
};

module.exports = { getAttendanceController };
