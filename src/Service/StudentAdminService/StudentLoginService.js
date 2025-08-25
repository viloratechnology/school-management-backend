const StudentAdminModel = require("../../Model/StudentAdminModal/StudentLoginModel");
const bcrypt = require("bcrypt");

const TofindStudentService = async (ans) => {
  const email = ans.email;
  const password = ans.password;
  const Db = await StudentAdminModel.TofindStudentModel(email);

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

module.exports = { TofindStudentService };
