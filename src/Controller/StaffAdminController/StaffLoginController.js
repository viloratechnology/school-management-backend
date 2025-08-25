// const StaffLoginService = require("../../Service/StaffAdminService/StaffLoginService");
// const JwtToken=require("../../JWT Service/StaffJwtService")
// const GetStudentModel=require("../../Model/StaffAdminModel/GetStudentModel")

// const StaffLoginController = (req, res) => {
//     // console.log(req.cookies,"cookies")
//     let body = '';

//     req.on('data', chunk => (body += chunk));

//     req.on('end', async () => {
//         if (!body) {
//             return res.status(400).send({ message: "Invalid Inputs" });
//     }
//         try {
//             // console.log(body)
//             const loginData = req.cookies;
            
//             console.log(loginData,"cookies")

//             const result = await StaffLoginService.StaffLoginService(loginData);
//             // console.log(result,"resss")
//             if (result.message === "Password Match") {
//                 // const jwtmessage=[ "Login successfully".toUpperCase()]
//                 res.cookie("StaffAdminToken", JwtToken.StaffJwtToken(result.id,result.email), {

//                     maxAge: 900000, 
//                     httpOnly: false,
//                     secure: false,
//                     sameSite : false 

//                 });


//                 res.cookie("path","/Staff")
//                 res.cookie("staffid",result.id)
//                 return res.status(200).send({ message: "Login successfully".toUpperCase() });
//             } else if (result === "Invalid Email") {
//                 return res.status(404).send({ message: "Invalid Email" });
//             } else if (result === "Invalid Password") {
//                 return res.status(401).send({ message: "Invalid Password" });
//             } else {
//                 return res.status(500).send({ message: "Login Failed" });
//             }

//         } catch (err) {
//             console.error("Error during login:", err);
//             return res.status(500).send({ message: "Server Error", error: err });
//         }
//     });
// };

// module.exports = { StaffLoginController };