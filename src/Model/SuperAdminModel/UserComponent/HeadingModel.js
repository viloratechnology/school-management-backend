const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addHeadingModel = (
  photo_name,
  photo_path,
  school_name,
  school_address
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO schoolHeading_tbl (photo_name,photo_path,school_name,school_address) VALUES (?, ?, ?, ?)`;
    DatabaseConnection.query(
      sql,
      [photo_name, photo_path, school_name, school_address],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const getHeadingModel = () => {
  const sql = `SELECT id,photo_name,photo_path,school_name,school_address FROM schoolheading_tbl`;
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const editHeadingModel = (data) => {
  const sql = `
    UPDATE schoolheading_tbl 
    SET photo_name = ?, photo_path = ?, school_name = ?, school_address = ?, updated_by = ? 
    WHERE id = ? AND deleted_by = 0`;

  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      sql,
      [
        data.photo_name,
        data.photo_path,
        data.school_name,
        data.school_address,
        data.updated_by,
        data.id,
      ],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

module.exports = { addHeadingModel, getHeadingModel, editHeadingModel };
