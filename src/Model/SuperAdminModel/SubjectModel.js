const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addSubjectModel = (subject_name, createdBy) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into subject_tbl(subject_name,createdBy) values(?,?)`;
    DatabaseConnection.query(query, [subject_name, createdBy], (error) => {
      if (error) {
        reject(error);
      }
      resolve("sucess");
    });
  });
};
const addSubjectStaffIdModel = (Subject, getdata) => {
  const Values = Subject.map((item) => [item, getdata]);
  return new Promise((resolve, reject) => {
    const query = `Insert into staffidentifybysubject_tbl(subject_id,staff_id) values ?`;
    DatabaseConnection.query(query, [Values], (error, result) => {
      console.log(error,"subj")
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
const getSubjectModel = () => {
  return new Promise((resolve, reject) => {
    const query = "select id,subject_name from subject_tbl where isDeleted=0";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editSubjectModel = (subject_name, id, updatedBy) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE subject_tbl SET subject_name=?,updatedBy=? where id=?`,
      [subject_name, updatedBy, id],
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

const deleteSubjectModel = (id) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE subject_tbl SET isDeleted=1 where id=?`,
      [id],
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

module.exports = {
  addSubjectModel,
  getSubjectModel,
  editSubjectModel,
  deleteSubjectModel,
  addSubjectStaffIdModel,
};
