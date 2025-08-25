const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const TofindStudentModel = (email) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `SELECT id,email,password from student_tbl where email=?`,
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

module.exports = { TofindStudentModel };
