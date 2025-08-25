const DatabaseConnection = require("../../../DatabaseConnection/DbConnection");

const addGalleryModel = (files) => {
  const value = files.map((file) => [file.filename, file.path]);

  return new Promise((resolve, reject) => {
    const query = `Insert into gallery_images(proof_name,proofImagePath) values ?`;
    DatabaseConnection.query(query, [value], (error) => {
      if (error) {
        reject(error);
      }
      resolve("sucess");
    });
  });
};
const getGalleryModel = () => {
  return new Promise((resolve, reject) => {
    const query = `
        select proof_name,proofImagePath from gallery_images
        ;`;

    DatabaseConnection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

module.exports = { addGalleryModel, getGalleryModel };
