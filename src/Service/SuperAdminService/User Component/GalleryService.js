const GalleryModel = require("../../../Model/SuperAdminModel/User Component/GalleryModel");

const addGalleryService = async (files) => {
  const getdata = await GalleryModel.addGalleryModel(files);
  return getdata;
};

const getGalleryService = async () => {
  const data = await GalleryModel.getGalleryModel();
  return data;
};

module.exports = { addGalleryService, getGalleryService };
