const GalleryModel = require("../../../Model/SuperAdminModel/UserComponent/GalleryModel");

const addGalleryService = async (files) => {
  const getdata = await GalleryModel.addGalleryModel(files);
  return getdata;
};

const getGalleryService = async () => {
  const data = await GalleryModel.getGalleryModel();
  return data;
};

module.exports = { addGalleryService, getGalleryService };
