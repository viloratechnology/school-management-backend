const StudentService = require("../../Service/StaffAdminService/GetStudentService")
const { successResponse, errorResponse } = require('../../Utilities/ApiResponse');

const getStudentController = async (req, res) => {
    try {
        const id = req.params["id"]
        const data = await StudentService.getStudentService(id);
        console.log(data,"cont")
        return res.status(200).json(successResponse("Get Student",data));
    } catch (error) {
        return res.status(500).json(errorResponse("Student Not Get",error));
    }
};

module.exports = { getStudentController }