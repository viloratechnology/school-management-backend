const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const getStaffCircularModel = () => {
  return new Promise((resolve, reject) => {
    const query = "select content,title,circular_date from staff_circular_tbl";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const addStaffCircularModel = (content, title, createdBy) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into staff_circular_tbl(content,title,createdBy) values(?,?,?)`;
    DatabaseConnection.query(
      query,
      [content, title, createdBy],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

module.exports = { addStaffCircularModel,getStaffCircularModel };
