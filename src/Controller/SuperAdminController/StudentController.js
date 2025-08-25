const StudentService = require("../../Service/SuperAdminService/StudentService");
const sendEmail = require("../../Utilities/Email");
const {
  successResponse,
  errorResponse,
} = require("../../Utilities/ApiResponse");
const ChunksToData = require("../../Utilities/ChunksToData");

const addStudentController = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    const email = data.Email;
    const result = await StudentService.addStudentService(data, file);
    const password = result.Randompassword;
    const mailOptions = {
      to: email,
      subject: "Student Login Password",
      message: `Your password is: ${password}`,
    };
    await sendEmail(mailOptions);
    return res
      .status(201)
      .json(successResponse("Student registered and email sent.", result));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to register student.", error));
  }
};

const getStudentController = async (req, res) => {
  try {
    const data = await StudentService.getStudentService();
    return res.status(200).json(successResponse("Data Recieved", data));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to retrieve student information.", error));
  }
};

const editStudentController = async (req, res) => {
  try {
    const data = await ChunksToData.parseRequestBody(req);
    const result = await StudentService.editStudentService(data);
    return res
      .status(201)
      .json(
        successResponse("Student information updated successfully.", result)
      );
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to update student information.", error));
  }
};

const userNameStudentController = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await StudentService.userNameService(id);
    return res
      .status(200)
      .json(successResponse("Student Name Fetch Successfully", data));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to retrieve student info by ID.", error));
  }
};

const getStudentCountController = async (req, res) => {
  try {
    const count = await StudentService.getStudentCountService();
    return res
      .status(200)
      .json(successResponse("Student Count Get Successfully", count));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Failed to retrieve student count.", error));
  }
};

module.exports = {
  addStudentController,
  getStudentController,
  editStudentController,
  userNameStudentController,
  getStudentCountController,
};
