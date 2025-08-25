const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addManagementModel = (
  name,
  position,
  image,
  qualification,
  experience,
  email,
  phone,
  description,
  image_name,
  image_path,
  createby,
  updatedby,
  linkedin
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO management_members 
    (name, position, qualification, experience, email, phone, description,image_name,image_path,create_by,update_by,linkedin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)`;
    DatabaseConnection.query(
      sql,
      [
        name,
        position,
        image,
        qualification,
        experience,
        email,
        phone,
        description,
        image_name,
        image_path,
         createby,
         updatedby,
        linkedin,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const getManagementModel = () => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      "SELECT id,name,position,qualification,experience,email,phone,description,image_name,image_path,linkedin FROM management_members",
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = { addManagementModel, getManagementModel };
