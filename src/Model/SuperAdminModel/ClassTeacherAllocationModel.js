const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addClassTeacherAllocationModel = (
staff_id,role_id,standard_id,section_id,createdBy
) => {
  return new Promise((resolve, reject) => {
  
   const query = `Insert into classteacherallocation_tbl(staff_id,role_id,standard_id,section_id,createdBy) values(?,?,?,?,?)`
  
  
    DatabaseConnection.query(
      query,[staff_id,role_id,standard_id,section_id,createdBy],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getClassTeacherAllocationModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select  classteacherallocation_tbl.id,standard_tbl.name as std ,section_tbl.name as section, staff_tbl.name as staff,classteacherallocation_tbl.standard_id,
        classteacherallocation_tbl.section_id,classteacherallocation_tbl.staff_id,staffrole_tbl.name as role,classteacherallocation_tbl.role_id
        from classteacherallocation_tbl
        Left join standard_tbl
        on standard_tbl.id = classteacherallocation_tbl.standard_id
        Left join  section_tbl
        on section_tbl.id = classteacherallocation_tbl.section_id
         Left join  staff_tbl
        on staff_tbl.id = classteacherallocation_tbl.staff_id
             Left join  staffrole_tbl
        on staffrole_tbl.id = classteacherallocation_tbl.role_id
          where classteacherallocation_tbl.isDeleted=0
        ;`;

    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};


const editClassTeacherAllocationModel = (
id,staff_id,role_id,standard_id,section_id,updatedBy
) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE classteacherallocation_tbl SET staff_id=?,role_id=?,standard_id=?,section_id=?,updatedBy=? where id=?`,
      [staff_id,role_id,standard_id,section_id,updatedBy,id],
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


const deleteClassTeacherAllocationModel = (id) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE classteacherallocation_tbl SET isDeleted=1 where id=?`,
      [id],
      (error, result) => {
        console.log(result, error);
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};


module.exports={addClassTeacherAllocationModel,getClassTeacherAllocationModel,editClassTeacherAllocationModel,deleteClassTeacherAllocationModel}