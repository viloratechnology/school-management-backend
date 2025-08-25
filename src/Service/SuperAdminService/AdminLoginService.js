const AdminLoginModel = require("../../Model/SuperAdminModel/AdminLoginModel");
const bcrypt = require("bcrypt");

const TofindAdminService = async (ans) => {
  const name = ans.name;
  const password = ans.password;
  const Db = await AdminLoginModel.TofindAdminModel(name);

  return new Promise((resolve, reject) => {
    if (!Db || Db.length === 0) {
      return resolve("Invalid UserName");
    } else {
      const Dbpassword = Db[0].password;
      bcrypt.compare(password, Dbpassword, (error, result) => {
        if (error) {
          return resolve("Hashed Error");
        } else if (result == true) {
          const obj = {
            id: Db[0].id,
            name: Db[0].name,
            message: "Password Match",
          };
          return resolve(obj);
        } else {
          return resolve("Invalid Password");
        }
      });
    }
  });
};

module.exports = { TofindAdminService };
