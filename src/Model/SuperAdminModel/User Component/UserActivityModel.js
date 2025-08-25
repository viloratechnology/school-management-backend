const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addActivityModel = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO userhighlight_tbl (img, title, content, create_by) VALUES (?, ?, ?, ?)`;
    DatabaseConnection.query(
      sql,
      [data.img, data.title, data.content, data.create_by],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const getAllActivityModel = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id,img,title,content FROM userhighlight_tbl`;
    DatabaseConnection.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const editActivityModel = (id, data) => {
  return new Promise((resolve, reject) => {
    let query = "";
    let values = [];

    if (data.img) {
      query = `UPDATE userhighlight_tbl SET img = ?, title = ?, content = ?, update_by = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND deleted_at IS NULL`;
      values = [data.img, data.title, data.content, data.update_by, id];
    } else {
      query = `UPDATE userhighlight_tbl SET title = ?, content = ?, update_by = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND deleted_at IS NULL`;
      values = [data.title, data.content, data.update_by, id];
    }

    DatabaseConnection.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = {
  addActivityModel,
  getAllActivityModel,
  editActivityModel,
};
