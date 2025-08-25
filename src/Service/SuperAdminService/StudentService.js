const StudentModel = require("../../Model/SuperAdminModel/StudentModel");
const { nanoid } = require("../../Utilities/NanoId");
const bcrypt = require("bcrypt");
const { password } = require("../../Utilities/Randompassword");

const addStudentService = async (ans, file) => {
  const id = nanoid(10);
  const Randompassword = password(8);
  const hashedPassword = await bcrypt.hash(Randompassword, 2);
  const getdata = await StudentModel.AddStudentModel(
    id,
    ans.StudentCode,
    ans.Email,
    hashedPassword,
    ans.StudentName,
    ans.Dob,
    ans.PhoneNumber,
    ans.Standard,
    ans.Section,
    ans.TypeofParental,
    ans.FatherName,
    ans.FatherOccupation,
    ans.MotherName,
    ans.MotherOccupation,
    ans.GuardianName,
    ans.GuardianOccupation,
    file.originalname,
    file.filename,
    ans.AdmissionNumber,
    ans.HouseNo,
    ans.Area,
    ans.State,
    ans.City,
    ans.PinCode,
    ans.id
  );
  return { Randompassword, getdata };
};

const getStudentService = async () => {
  const data = await StudentModel.getStudentModel();
  return data;
};

const editStudentService = async (ans) => {
  const data = await StudentModel.editStudentModel(
    ans.id,
    ans.StudentCode,
    ans.Email,
    ans.StudentName,
    ans.Dob,
    ans.PhoneNumber,
    ans.FatherName,
    ans.FatherOccupation,
    ans.MotherName,
    ans.MotherOccupation,
    ans.GuardianName,
    ans.GuardianOccupation,
    ans.AdmissionNumber,
    ans.HouseNo,
    ans.Area,
    ans.State,
    ans.City,
    ans.PinCode,
    ans.updatedBy
  );
  return data;
};

const userNameService = async (id) => {
  const data = await StudentModel.userNameModel(id);
  return data;
};

const getStudentCountService = async () => {
  const count = await StudentModel.getStudentCountModel();
  return count;
};

module.exports = {
  addStudentService,
  getStudentService,
  editStudentService,
  userNameService,
  getStudentCountService,
};
