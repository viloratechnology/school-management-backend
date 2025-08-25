const PeriodModel = require("../../Model/SuperAdminModel/PeriodModel");

const addPeriodService = async (Loginans) => {
  const data = await PeriodModel.addPeriodModel(Loginans.Period, Loginans.id);
  return data;
};

const getPeriodService = async () => {
  const data = await PeriodModel.getPeriodModel();
  if (!data || data.length === 0) {
    return (data = []);
  }
  return data;
};

const editPeriodService = async (editans) => {
  const data = await PeriodModel.editPeriodModel(
    editans.Period,
    editans.id,
    editans.updatedy
  );
  return data;
};
module.exports = { addPeriodService, getPeriodService, editPeriodService };
