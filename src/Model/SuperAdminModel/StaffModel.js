const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const AddStaffModel = (
  id,
  role_id,
  staffCode,
  email,
  password,
  name,
  dob,
  phoneNumber,
  qualification,
  photoName,
  photoPath,
  houseNo,
  Area,
  State,
  City,
  Pincode,
  createdBy,
  Street,
  subject_id
) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into staff_tbl(id,role_id,staffCode,email,password,name,dob,phoneNumber,qualification,photoName,photoPath,HouseNo,Area,State,City,Pincode,createdBy,Street,subject_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    DatabaseConnection.query(
      query,
      [
        id,
        role_id,
        staffCode,
        email,
        password,
        name,
        dob,
        phoneNumber,
        qualification,
        photoName,
        photoPath,
        houseNo,
        Area,
        State,
        City,
        Pincode,
        createdBy,
        Street,
        subject_id,
      ],
      (error, result) => {
        if (error) {
          console.log(error, "mdoel");
          reject(error);
        }
        resolve(id);
      }
    );
  });
};

const getStaffModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select staff_tbl.id,staffrole_tbl.name as Role,staff_tbl.staffCode,staff_tbl.email,staff_tbl.password,staff_tbl.name,staff_tbl.dob,staff_tbl.phoneNumber,staff_tbl.qualification,staff_tbl.photoName,staff_tbl.photoPath,
        staff_tbl.HouseNo,staff_tbl.Street,staff_tbl.Area,staff_tbl.State,staff_tbl.City,staff_tbl.Pincode,subject_tbl.subject_name as subject
        from staff_tbl 
        left join staffrole_tbl
        on staffrole_tbl.id=staff_tbl.role_id
        left join subject_tbl
        on subject_tbl.id=staff_tbl.subject_id`;
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editStaffModel = (
  id,
  staffCode,
  role,
  email,
  name,
  dob,
  phoneNumber,
  qualification,
  HouseNo_Street,
  Area,
  State,
  City,
  Pincode,
  updatedBy
) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE staff_tbl SET staffCode=?,role_id=?,email=?,name=?,dob=?,phoneNumber=?,qualification=?,HouseNo=?,Area=?,State=?,City=?,Pincode=?,updatedBy=?,Street=? where id=?`,
      [
        staffCode,
        role,
        email,
        name,
        dob,
        phoneNumber,
        qualification,
        HouseNo_Street,
        Area,
        State,
        City,
        Pincode,
        updatedBy,
        id,
      ],
      (error, result) => {
        console.log(error, result, "model");
        if (error) {
          return reject(error, "model error");
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const userNameModel = (id) => {
  return new Promise((resolve, reject) => {
    const query = "select name,email,photoName from staff_tbl where id=?";
    DatabaseConnection.query(query, [id], (error, result) => {
      if (error) {
        console.log(error, "getmodel");
        reject(error);
      }
      resolve(result);
    });
  });
};

const getStaffCountModel = () => {
  return new Promise((res, rej) => {
    const query = "SELECT COUNT(*) AS count FROM staff_tbl";
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
  AddStaffModel,
  getStaffModel,
  editStaffModel,
  userNameModel,
  getStaffCountModel,
};
