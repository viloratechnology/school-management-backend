const StaffModel = require("../../Model/SuperAdminModel/StaffModel");
const { nanoid } = require("../../Utilities/NanoId");
const bcrypt = require("bcrypt");
const { password } = require("../../Utilities/Randompassword");
const SubjectModel = require("../../Model/SuperAdminModel/SubjectModel");

const addStaffService = async (Loginans, file) => {
  const id = nanoid(10);
  const Randompassword = password(8);
  const hashedPassword = await bcrypt.hash(Randompassword, 2);
  let subjectValue = Loginans.Subject;
  let subjectLength = subjectValue.split(",");
  const getdata = await StaffModel.AddStaffModel(
    id,
    Loginans.Role,
    Loginans.StaffCode,
    Loginans.Email,
    hashedPassword,
    Loginans.UserName,
    Loginans.Dob,
    Loginans.PhoneNumber,
    Loginans.Qualification,
    file.filename,
    file.path, 
    Loginans.HouseNo,
    Loginans.Area,
    Loginans.State,
    Loginans.City,
    Loginans.PinCode,
    Loginans.id,
    Loginans.Street,
    Loginans.Subject
  );
  const subjectStaffTbl = await SubjectModel.addSubjectStaffIdModel(
    subjectLength,
    getdata
  );

  return { Randompassword, getdata };
};

const getStaffService = async () => {
  const data = await StaffModel.getStaffModel();
  return data;
};

const editStaffService = async (editans) => {
  const data = await StaffModel.editStaffModel(
    editans.id,
    editans.StaffCode,
    editans.Role,
    editans.Email,
    editans.StaffName,
    editans.Dob,
    editans.PhoneNumber,
    editans.Qualification,
    editans.HouseNo,
    editans.Street,
    editans.Area,
    editans.State,
    editans.City,
    editans.PinCode,
    editans.updatedBy
  );
  console.log(data,"Ser")
  return data;
};

const userNameService = async (id) => {
  const data = await StaffModel.userNameModel(id);
  return data;
};

const getStaffCountService = async () => {
  const count = await StaffModel.getStaffCountModel();
  return count;
};

module.exports = {
  addStaffService,
  getStaffService,
  editStaffService,
  userNameService,
  getStaffCountService,
};
