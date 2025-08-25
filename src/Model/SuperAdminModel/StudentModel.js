const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const AddStudentModel = (
  id,
  studentCode,
  email,
  password,
  name,
  dob,
  phoneNumber,
  standard_id,
  section_id,
  TypeofParental,
  FatherName,
  FatherOccupation,
  MotherName,
  MotherOccupation,
  GuardianName,
  GuardianOccupation,
  photoName,
  photoPath,
  addmissionNumber,
  HouseNo_Street,
  Area,
  State,
  City,
  Pincode,
  createdBy
) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into student_tbl(id,studentCode,email,password,name,dob,phoneNumber,standard_id,section_id, typeofParental,
          FatherName,
          FatherOccupation,
          MotherName,
          MotherOccupation,
          GuardianName,
          GuardianOccupation,photoName,photoPath,addmissionNumber,HouseNo_Street,Area,State,City,Pincode,createdBy ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    DatabaseConnection.query(
      query,
      [
        id,
        studentCode,
        email,
        password,
        name,
        dob,
        phoneNumber,
        standard_id,
        section_id,
        TypeofParental,
        FatherName,
        FatherOccupation,
        MotherName,
        MotherOccupation,
        GuardianName,
        GuardianOccupation,
        photoName,
        photoPath,
        addmissionNumber,
        HouseNo_Street,
        Area,
        State,
        City,
        Pincode,
        createdBy,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getStudentModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
           select student_tbl.id,student_tbl.studentCode, student_tbl.email, student_tbl.name,student_tbl.dob,student_tbl.phoneNumber,standard_tbl.name as std ,section_tbl.name as section,student_tbl.typeofParental,student_tbl.fatherName,student_tbl.fatherOccupation,student_tbl.motherName,student_tbl.motherOccupation,student_tbl.guardianName,student_tbl.guardianOccupation,student_tbl.photoName,student_tbl.photoPath,student_tbl.addmissionNumber ,
           student_tbl.HouseNo_Street,student_tbl.Area,student_tbl.State,student_tbl.City,student_tbl.Pincode
            from student_tbl
            Left join  standard_tbl
            on standard_tbl.id = student_tbl.standard_id
             Left join  section_tbl
             on section_tbl.id = student_tbl.section_id;`;
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editStudentModel = (
  id,
  studentCode,
  email,
  name,
  dob,
  phoneNumber,
  FatherName,
  FatherOccupation,
  MotherName,
  MotherOccupation,
  GuardianName,
  GuardianOccupation,
  addmissionNumber,
  HouseNo_Street,
  Area,
  State,
  City,
  Pincode,
  updatedBy
) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE student_tbl SET studentCode=?,email=?,name=?,dob=?,phoneNumber=?,        FatherName=?,
          FatherOccupation=?,
          MotherName=?,
          MotherOccupation=?,
          GuardianName=?,
          GuardianOccupation=?=?,addmissionNumber=? ,HouseNo_Street=?,Area=?,State=?,City=?,Pincode=? ,updatedBy=? where id=?`,
      [
        studentCode,
        email,
        name,
        dob,
        phoneNumber,
        FatherName,
        FatherOccupation,
        MotherName,
        MotherOccupation,
        GuardianName,
        GuardianOccupation,
        addmissionNumber,
        HouseNo_Street,
        Area,
        State,
        City,
        Pincode,
        updatedBy,
        id,
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const userNameModel = (id) => {
  return new Promise((resolve, reject) => {
    const query = "select name,email,photoName,photoPath from student_tbl where id=?";
    DatabaseConnection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const getStudentCountModel = () => {
  return new Promise((res, rej) => {
    const query = "SELECT COUNT(*) AS count FROM student_tbl";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        rej(error);
      } else {
        res(result[0].count);
      }
    });
  });
};

module.exports = {
  AddStudentModel,
  getStudentModel,
  editStudentModel,
  userNameModel,
  getStudentCountModel,
};
