const HeadingModel = require("../../../Model/SuperAdminModel/User Component/HeadingModel");

const addHeadingService = async (body, file) => {
  const result = await HeadingModel.addHeadingModel(
    file.originalname,
    file.filename,
    body.school_name,
    body.school_address
  );
  return result;
};

const getHeadingService = async () => {
  const result = await HeadingModel.getHeadingModel();
  return result;
};

const editHeadingService = async (data) => {
  const result = await HeadingModel.editHeadingModel(data);
  return result;
};

module.exports = { addHeadingService, getHeadingService, editHeadingService };
