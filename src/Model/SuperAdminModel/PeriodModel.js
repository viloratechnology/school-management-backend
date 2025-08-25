const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addPeriodModel = (period_number, createdBy) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into period_tbl(period_number,createdBy) values(?,?)`;
    DatabaseConnection.query(query, [period_number, createdBy], (error,result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const getPeriodModel = () => {
  return new Promise((resolve, reject) => {
    const query = "select id,period_number from period_tbl";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editPeriodModel = (period_number, id, updatedBy) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE period_tbl SET period_number=?,updatedBy=? where id=?`,
      [period_number, updatedBy, id],
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

module.exports = { addPeriodModel, getPeriodModel, editPeriodModel };
