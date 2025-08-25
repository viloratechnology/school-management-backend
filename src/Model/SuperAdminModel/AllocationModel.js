const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addAllocationModel = (
  standard_id,
  section_id,
  staff_id,
  createdBy,
  subject_id,
  role_id
) => {
  return new Promise((resolve, reject) => {
    let query="";
    let values=[];
    if(role_id){
     query = `Insert into allocation_tbl(standard_id,section_id,staff_id,createdBy,subject_id,role_id) values(?,?,?,?,?,?)`
    values= [standard_id, section_id, staff_id, createdBy, subject_id,role_id];
    }else{
       query = `Insert into allocation_tbl(standard_id,section_id,staff_id,createdBy,subject_id) values(?,?,?,?,?)`
    values= [standard_id, section_id, staff_id, createdBy, subject_id];
    }
    DatabaseConnection.query(
      query,values,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getAllocationModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select  allocation_tbl.id,standard_tbl.name as std ,section_tbl.name as section, staff_tbl.name as staff,subject_tbl.subject_name as subject,allocation_tbl.standard_id,
        allocation_tbl.section_id,allocation_tbl.staff_id,allocation_tbl.subject_id,staffrole_tbl.name as role,allocation_tbl.role_id
        from allocation_tbl
        Left join standard_tbl
        on standard_tbl.id = allocation_tbl.standard_id
        Left join  section_tbl
        on section_tbl.id = allocation_tbl.section_id
        Left join  subject_tbl
        on subject_tbl.id = allocation_tbl.subject_id
         Left join  staff_tbl
        on staff_tbl.id = allocation_tbl.staff_id
             Left join  staffrole_tbl
        on staffrole_tbl.id = allocation_tbl.role_id
          where allocation_tbl.isDeleted=0
        ;`;

    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const getStaffBySubjectModel = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
    select staffidentifybysubject_tbl.staff_id ,staff_tbl.name as staff
    from staffidentifybysubject_tbl 
    join staff_tbl
    on staff_tbl.id=staffidentifybysubject_tbl.staff_id
    where staffidentifybysubject_tbl.subject_id=?
    `;
    DatabaseConnection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editAllocationModel = (
  id,
  standard_id,
  section_id,
  staff_id,
  updatedBy,
  subject_id
) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE allocation_tbl SET standard_id=?,section_id=?,staff_id=?,updatedBy=?,subject_id=? where id=?`,
      [standard_id, section_id, staff_id, updatedBy,subject_id,id],
      (error, result) => {
        console.log(error,result)
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const deleteAllocationModel = (id) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE allocation_tbl SET isDeleted=1 where id=?`,
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

module.exports = {
  addAllocationModel,
  getAllocationModel,
  getStaffBySubjectModel,
  editAllocationModel,
  deleteAllocationModel,
};
