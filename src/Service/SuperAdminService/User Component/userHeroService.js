const userHeroModel = require("../../../Model/SuperAdminModel/User Component/UserHeroModel");

const addHeroService = async (body, heroBackground, heroIcon) => {
  const data = {
    heroBackground: heroBackground ? `/uploads/${heroBackground}` : null,
    heroIcon: heroIcon ? `/uploads/${heroIcon}` : null,
    heroTitle: body.heroTitle,
    heroSubTitle: body.heroSubTitle,
    created_by: body.created_by,
    updated_by: body.created_by,
  };

  const result = await userHeroModel.addHeroModel(data);
  return result;
};

const getHeroService = async () => {
  const result = await userHeroModel.getHeroModel();
  return result;
};

const editHeroService = async (id, body, heroBackground, heroIcon) => {
  const data = {
    heroBackground: heroBackground ? `/uploads/${heroBackground}` : null,
    heroIcon: heroIcon ? `/uploads/${heroIcon}` : null,
    heroTitle: body.heroTitle,
    heroSubTitle: body.heroSubTitle,
    updated_by: body.updated_by,
  };
  const result = await userHeroModel.editHeroModel(id, data);
  return result;
};

module.exports = {
  addHeroService,
  getHeroService,
  editHeroService,
};
