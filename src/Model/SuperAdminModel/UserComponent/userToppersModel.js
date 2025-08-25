const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addTopperModel = (topperImg, topperName, topperMark, standard, rank) => {
  return new Promise((resolve, reject) => {
    const query = `Insert into toppers_tbl(topperImg,topperName,topperMark,standard,Topper_rank) values(?,?,?,?,?)`;
    DatabaseConnection.query(
      query,
      [topperImg, topperName, topperMark, standard, rank],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getTopperModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select id,topperName,topperMark,topperImg,standard,Topper_rank from toppers_tbl;`;

    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
};

const editTopperModel = (
  topperImg,
  topperName,
  topperMark,
  standard,
  rank,
  id
) => {
  return new Promise((resolve, reject) => {
    let query = "";
    let values = [];

    if (topperImg) {
      query = `UPDATE toppers_tbl SET topperName = ?, topperMark = ?, topperImg = ?,standard=?,Topper_rank=? WHERE id = ?`;
      values = [topperName, topperMark, topperImg, standard, rank, id];
    } else {
      query = `UPDATE toppers_tbl SET topperName = ?, topperMark = ?,standard=?,Topper_rank=? WHERE id = ?`;
      values = [topperName, topperMark, standard, rank, id];
    }

    DatabaseConnection.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = { addTopperModel, getTopperModel, editTopperModel };
