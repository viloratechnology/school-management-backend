const TopperModel = require("../../../Model/SuperAdminModel/UserComponent/userToppersModel");

const addTopperService = async (body, files) => {
  const getdata = await TopperModel.addTopperModel(
    files.filename,
    body.topperName,
    body.topperMark,
    body.Standard,
    body.Rank
  );
  return getdata;
};

const getTopperService = async () => {
  const data = await TopperModel.getTopperModel();
  return data;
};

const editTopperService = async (body, files) => {
  const data = await TopperModel.editTopperModel(
    files,
    body.topperName,
    body.topperMark,
    body.Standard,
    body.Rank,
    body.id
  );
  return data;
};

module.exports = { addTopperService, getTopperService, editTopperService };
