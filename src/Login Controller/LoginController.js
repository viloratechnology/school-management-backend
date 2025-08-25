const StudentLoginService = require("../Service/StudentAdminService/StudentLoginService");
const AdminLoginService = require("../Service/SuperAdminService/AdminLoginService");
const StaffLoginService = require("../Service/StaffAdminService/StaffLoginService");
const JwtToken = require("../JWT Service/JwtService");
const { ROLE } = require("../JWT Service/Enums");

const LoginController = async (req, res) => {
  try {
    const loginData = req.cookies;
    if (loginData.who === ROLE.SUPERADMIN) {
      const result = await AdminLoginService.TofindAdminService(loginData);
      if (result.message === "Password Match") {
        res.cookie(
          "__as_secure",
          JwtToken.accessToken(result.id, result.email, loginData.who),
          {
            maxAge: 3600000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie(
          "__rs_secure",
          JwtToken.refreshToken(result.id, result.email, loginData.who),
          {
            maxAge: 86400000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie("path", "/Admin");
        res.cookie("adminid", result.id);
        return res
          .status(200)
          .send({ message: "Login successfully".toUpperCase() });
      } else if (result === "Invalid UserName") {
        return res.status(404).send({ message: "Invalid UserName" });
      } else if (result === "Invalid Password") {
        return res.status(401).send({ message: "Invalid Password" });
      } else {
        return res.status(500).send({ message: "Login Failed" });
      }
    } else if (loginData.who == ROLE.ADMIN) {
      const result = await StaffLoginService.TofindStaffService(loginData);
      if (result.message === "Password Match") {
        res.cookie(
          "__as_secure",
          JwtToken.accessToken(result.id, result.email, loginData.who),
          {
            maxAge: 3600000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie(
          "__rs_secure",
          JwtToken.refreshToken(result.id, result.email, loginData.who),
          {
            maxAge: 86400000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie("path", "/Staff");
        res.cookie("staffid", result.id);
        return res
          .status(200)
          .send({ message: "Login successfully".toUpperCase() });
      } else if (result === "Invalid Email") {
        return res.status(404).send({ message: "Invalid Email" });
      } else if (result === "Invalid Password") {
        return res.status(401).send({ message: "Invalid Password" });
      } else {
        return res.status(500).send({ message: "Login Failed" });
      }
    } else if (loginData.who == ROLE.USER) {
      const result = await StudentLoginService.TofindStudentService(loginData);
      if (result.message === "Password Match") {
        res.cookie(
          "__as_secure",
          JwtToken.accessToken(result.id, result.email, loginData.who),
          {
            maxAge: 3600000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie(
          "__rs_secure",
          JwtToken.refreshToken(result.id, result.email, loginData.who),
          {
            maxAge:  86400000,
            httpOnly: false,
            secure: false,
            sameSite: false,
          }
        );

        res.cookie("path", "/Student");
        res.cookie("studentid", result.id);
        return res
          .status(200)
          .send({ message: "Login successfully".toUpperCase() });
      } else if (result === "Invalid Email") {
        return res.status(404).send({ message: "Invalid Email" });
      } else if (result === "Invalid Password") {
        return res.status(401).send({ message: "Invalid Password" });
      } else {
        return res.status(500).send({ message: "Login Failed" });
      }
    } else {
      return res.send("No User");
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).send({ message: "Server Error", error: err });
  }
};
module.exports = { LoginController };
