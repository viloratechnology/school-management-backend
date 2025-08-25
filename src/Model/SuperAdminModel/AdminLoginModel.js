const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const TofindAdminModel = (name) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `SELECT id,name,password from superadmin_tbl where name=?`,
      [name],
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

module.exports = { TofindAdminModel };
