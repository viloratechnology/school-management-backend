const DatabaseConnection = require("../../DatabaseConnection/DbConnection");

const addRoleModel = (name, createdBy) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into staffrole_tbl(name,createdBy) values(?,?)`;
    DatabaseConnection.query(query, [name, createdBy], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const getRoleModel = () => {
  return new Promise((resolve, reject) => {
    const query = "select id, name from staffrole_tbl where isDeleted=0";
    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const editRoleModel = (name, id, updatedBy) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE staffrole_tbl SET name=?,updatedBy=? where id=?`,
      [name, updatedBy, id],
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

const deleteRoleModel = ( id) => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      `UPDATE staffrole_tbl SET isDeleted=1 where id=?`,[id],
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


module.exports = { addRoleModel, getRoleModel, editRoleModel ,deleteRoleModel};
