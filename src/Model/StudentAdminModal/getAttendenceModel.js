const DatabaseConnection=require("../../DatabaseConnection/DbConnection")

const getAttendanceModel = (id) => {
    return new Promise((resolve, reject) => {
      const query=`
      select attendance_tbl.id,attendance_tbl.DateOfAtt,attendance_tbl.FORENOON,attendance_tbl.AFTERNOON,student_tbl.name as student,standard_tbl.name as std,section_tbl.name as section
       from attendance_tbl 
       join standard_tbl
       on standard_tbl.id=attendance_tbl.standard_id
       join section_tbl
       on section_tbl.id=attendance_tbl.section_id
       join student_tbl
       on student_tbl.id=attendance_tbl.student_id 
       where attendance_tbl.student_id=?`
      DatabaseConnection.query(query,[id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };


  module.exports={getAttendanceModel}