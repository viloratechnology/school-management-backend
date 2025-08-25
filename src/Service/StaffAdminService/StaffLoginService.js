const StaffAdminModel = require("../../Model/StaffAdminModel/StaffLoginModel");
const bcrypt = require("bcrypt");

const TofindStaffService = async (ans) => {
  const email = ans.email;
  const password = ans.password;
  const Db = await StaffAdminModel.TofindStaffModel(email);

  return new Promise((resolve, reject) => {
    if (!Db || Db.length === 0) {
      return resolve("Invalid Email");
    } else {
      const Dbpassword = Db[0].password;
      bcrypt.compare(password, Dbpassword, (error, result) => {
        if (error) {
          return resolve("Hashed Error");
        } else if (result == true) {
          const obj = {
            id: Db[0].id,
            email: Db[0].email,
            photoName: Db[0].photoName,
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

module.exports = { TofindStaffService };
