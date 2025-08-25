const DatabaseConnection = require("../../DatabaseConnection/DbConnection")

const getStudentModel = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      select student_tbl.id,student_tbl.name,student_tbl.dob,student_tbl.motherName,student_tbl.phoneNumber,student_tbl.email,standard_tbl.name as std,standard_tbl.id as stdid ,section_tbl.name as section,section_tbl.id as sectionid
       from student_tbl 
       join standard_tbl
       on standard_tbl.id=student_tbl.standard_id
       join section_tbl
       on section_tbl.id=student_tbl.section_id
       join allocation_tbl
       on allocation_tbl.standard_id=student_tbl.standard_id and
        allocation_tbl.section_id=student_tbl.section_id 
        where allocation_tbl.staff_id=?
             `
    DatabaseConnection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);

      }
      resolve(result);
    });
  });
};


module.exports = { getStudentModel }