const CalenderModel = require("../../Model/SuperAdminModel/CalenderModel");

const addCalenderService = async (body) => {
  const getdata = await CalenderModel.addCalenderModel(body.date, body.event);
  return getdata;
};

const getCalenderService = async () => {
  const getdata = await CalenderModel.getCalenderModel();
  if (!getdata || getdata.length === 0) {
    return [];
  }
  return getdata;
};

module.exports = {addCalenderService, getCalenderService };
