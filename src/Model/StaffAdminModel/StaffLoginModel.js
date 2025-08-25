const DatabaseConnection = require("../../DatabaseConnection/DbConnection");


const TofindStaffModel = (email) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `SELECT id,email,password,photoName from staff_tbl where email=?`,
      [email],
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


module.exports = { TofindStaffModel };
