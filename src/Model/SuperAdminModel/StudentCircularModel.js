const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const StudentCircularModel = (content, title, createdBy) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into student_circular_tbl(content,title,createdBy) values(?,?,?)`;
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

const getStudentCircularModel = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select content,title,circular_date from student_circular_tbl";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};


module.exports = {
  StudentCircularModel,
  getStudentCircularModel
};
