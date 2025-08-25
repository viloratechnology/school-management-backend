const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addHeroModel = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO hero_section 
      (heroBackground, heroIcon, heroTitle, heroSubTitle, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?)`;

    DatabaseConnection.query(
      query,
      [
        data.heroBackground,
        data.heroIcon,
        data.heroTitle,
        data.heroSubTitle,
        data.created_by,
        data.updated_by,
      ],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const getHeroModel = () => {
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(
      "SELECT id,heroBackground,heroIcon,heroTitle,heroSubTitle FROM hero_section",
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const editHeroModel = (id, data) => {
  return new Promise((resolve, reject) => {
    let query = "";
    let values = [];
    if (data.heroBackground) {
      query = `
        UPDATE hero_section 
        SET heroBackground=?, heroIcon=?, heroTitle=?, heroSubTitle=?, updated_by=? 
        WHERE id=?`;
      values = [
        data.heroBackground,
        data.heroIcon,
        data.heroTitle,
        data.heroSubTitle,
        data.updated_by,
        id,
      ];
    } else if (data.heroIcon) {
      query = `
      UPDATE hero_section 
      SET heroIcon=?, heroTitle=?, heroSubTitle=?, updated_by=? 
      WHERE id=?`;
      values = [
        data.heroIcon,
        data.heroTitle,
        data.heroSubTitle,
        data.updated_by,
        id,
      ];
    } else {
      query = `
        UPDATE hero_section 
        SET heroTitle=?, heroSubTitle=?, updated_by=? 
        WHERE id=?`;
      values = [data.heroTitle, data.heroSubTitle, data.updated_by, id];
    }

    DatabaseConnection.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  addHeroModel,
  getHeroModel,
  editHeroModel,
};
