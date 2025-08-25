const AdminroleService = require("../../Service/SuperAdminService/SuperAdminService");
const sendEmail = require("../../Utilities/Email");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");

const addSuperAdminController = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    const result = await AdminroleService.addSuperAdminService(data);
    const password = result.Randompassword;
    const mailOptions = {
      to: email,
      subject: "Super Admin Login Password",
      message: `Your password is: ${password}`,
    };
    await sendEmail(mailOptions);
    return res
      .status(201)
      .json(successResponse("Super Admin registered and email sent.", result));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to register Super Admin.", error));
  }
};

const getSuperAdminController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AdminroleService.getSuperAdminService(id);
    return res
      .status(200)
      .json(successResponse("Super Admin Data Get Successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to retrieve Super Admin info.", error));
  }
};

module.exports = { addSuperAdminController, getSuperAdminController };
