const sendEmail = require("../../Utilities/Email");
const StaffService = require("../../Service/SuperAdminService/StaffService");
const { successResponse, errorResponse } = require("../../Utilities/ApiResponse");

const AddStaffController = async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;
        const email = data.Email;
        const result = await StaffService.addStaffService(data,file);
        const password = result.Randompassword;
        const mailOptions = {
            to: email,
            subject: "Staff Login Password",
            message: `Your password is: ${password}`,
        };
        await sendEmail(mailOptions);
        return res.status(201).json(successResponse("Staff registered and email sent",result));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to register staff",error.message));
    }
};

const getStaffController = async (req, res) => {
    try {
        const data = await StaffService.getStaffService();
        return res.status(200).json(successResponse("Get Staff Successfully",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to retrieve staff information.",error));
    }
};

const editStaffController = async (req, res) => {
    try {
        const data = await chunkData.parseRequestBody(req);
        console.log(data,"contr")
        await StaffService.editStaffService(data);
        return res.status(201).json(successResponse("Staff information updated successfully.",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to update staff information.",error));
    }
};

const userNameStaffController = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await StaffService.userNameService(id);
        return res.status(200).json(successResponse("Staff Name Fetch Successfully",data));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to fetch staff info by ID.",error));
    }
};

const getStaffCountController = async (req, res) => {
    try {
        const count = await StaffService.getStaffCountService();
        return res.status(200).json(successResponse("Get Staff Count Successfully",count));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Failed to get staff count.",error));
    }
};

module.exports = { AddStaffController, getStaffController, editStaffController, userNameStaffController, getStaffCountController, };
