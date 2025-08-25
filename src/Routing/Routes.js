const express=require("express")
const upload = require("../MiddleWare/upload")

//Login 
const LoginController=require("../Login Controller/LoginController")

//Principal Admin
const AdminController=require("../Controller/SuperAdminController/SuperAdminController")
const StaffController=require("../Controller/SuperAdminController/StaffController")
const StudentController=require('../Controller/SuperAdminController/StudentController')
const SectionController=require("../Controller/SuperAdminController/SectionController")
const StandardController=require("../Controller/SuperAdminController/StandardController")
const AllocationController=require("../Controller/SuperAdminController/AllocationController")
const PeriodController = require("../Controller/SuperAdminController/PeriodController")
const SubjectController=require("../Controller/SuperAdminController/SubjectController")
const CircularController=require("../Controller/SuperAdminController/CircularController")
const RoleController=require("../Controller/SuperAdminController/RoleController")
const ClassTeacherAllocation=require("../Controller/SuperAdminController/ClassTeacherController")

//Staff Admin
const ActivityController=require("../Controller/StaffAdminController/ActivitiesController")
const AttendanceController=require("../Controller/StaffAdminController/AttendanceController")
const HomeworkController=require("../Controller/StaffAdminController/HomeworkController")
const GetStudentController=require("../Controller/StaffAdminController/GetStudentContoller")

//Student Admin
const getHomeworkController=require("../Controller/StudentAdminController/getHomeworkController")
const getActivityController=require("../Controller/StudentAdminController/getActivitiesController")
const getAttendanceController=require("../Controller/StudentAdminController/getAttendanceController")

//User Admin
const GalleryController=require("../Controller/SuperAdminController/User Component/GalleryController")
const CalenderContoller=require("../Controller/SuperAdminController/CalenderController")
const userActivityController = require("../Controller/SuperAdminController/User Component/UserActivityController");
const userToppersController = require("../Controller/SuperAdminController/User Component/UserToppersController");
const userHeroController = require("../Controller/SuperAdminController/User Component/UserHeroController");
const HeadingController=require("../Controller/SuperAdminController/User Component/HeadingController")
const ManagementController = require('../Controller/SuperAdminController/User Component/ManangementController');

const chatbotController = require("../Controller/AiController/chatbotController")
const { authorizeRoles } = require("../JWT Service/authorizeRoles")
const MiddleWare=require("../MiddleWare/MiddleWare")
const {ROLE} = require("../JWT Service/Enums")
const toGentrateRefreshToken = require("../Service/RefreshTokenService")

const route=express.Router();

route.post("/api/v1/login",LoginController.LoginController)

route.post("/api/v1/superAdmin",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AdminController.addSuperAdminController)
route.get("/api/v1/getSuperAdmin/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AdminController.getSuperAdminController)
//blmf7f0r-staff,xehpuzls-student,6islqjra-admin

route.post("/api/v1/addStaff",upload.single("PhotoProofs"),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StaffController.AddStaffController)
route.get("/api/v1/getStaff",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StaffController.getStaffController)
route.post("/api/v1/editStaff",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StaffController.editStaffController)
route.get("/api/v1/userNameStaff/:id",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),StaffController.userNameStaffController) 
route.get("/api/v1/staffCount",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), StaffController.getStaffCountController);

route.post("/api/v1/addstudent",upload.single("PhotoProof"),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StudentController.addStudentController)
route.get("/api/v1/getStudent",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN,ROLE.ADMIN),StudentController.getStudentController)
route.post("/api/v1/editStudent",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StudentController.editStudentController)
route.get("/api/v1/userNameStudent/:id",MiddleWare.authenticate,authorizeRoles(ROLE.USER),StudentController.userNameStudentController)
route.get("/api/v1/studentCount", MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN,ROLE.ADMIN),StudentController.getStudentCountController);

route.post("/api/v1/section",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SectionController.addSectionController)
route.get("/api/v1/getSection",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN,ROLE.ADMIN),SectionController.getSectioController)
route.post("/api/v1/editSection",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SectionController.editSectionController)
route.patch("/api/v1/deleteSection/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SectionController.deleteSectionController)

route.post("/api/v1/period",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),PeriodController.addPeriodController)
route.get("/api/v1/getPeriod",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),PeriodController.getPeriodController)
route.patch("/api/v1/editPeriod",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),PeriodController.editPeriodController)

route.get("/api/v1/refreshToken",toGentrateRefreshToken.refreshTokenController);

route.post("/api/v1/subject",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SubjectController.addSubjectController)
route.get("/api/v1/getSubject",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SubjectController.getSubjectController)
route.post("/api/v1/editSubject",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SubjectController.editSubjectController)
route.patch("/api/v1/deleteSubject/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),SubjectController.deleteSubjectController)

route.post("/api/v1/standard",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StandardController.addStandardController)
route.get("/api/v1/getStandard",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN,ROLE.ADMIN),StandardController.getStandardController)
route.post("/api/v1/editStandard",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StandardController.editStandardController)
route.patch("/api/v1/deleteStandard/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),StandardController.deleteStandardController)

route.post("/api/v1/role",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),RoleController.addRoleController)
route.get("/api/v1/getRole",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),RoleController.getRoleController)
route.post("/api/v1/editRole",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),RoleController.editRoleController)
route.patch("/api/v1/deleteRole/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),RoleController.deleteRoleController)

route.post("/api/v1/allocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AllocationController.addAllocationController)
route.get("/api/v1/getAllocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AllocationController.getAllocationController)
route.post("/api/v1/editAllocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AllocationController.editAllocationController)
route.patch("/api/v1/deleteAllocation/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AllocationController.deleteAllocationController)
route.get("/api/v1/getStaffbySubject/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),AllocationController.getStaffBySubjectController)

route.post("/api/v1/classTeacherAllocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),ClassTeacherAllocation.addClassTeacherAllocationController)
route.get("/api/v1/getclassTeacherAllocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),ClassTeacherAllocation.getClassTeacherAllocationController)
route.post("/api/v1/editclassTeacherAllocation",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),ClassTeacherAllocation.editClassTeacherAllocationController)
route.patch("/api/v1/deleteclassTeacherAllocation/:id",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),ClassTeacherAllocation.deleteClassTeacherAllocationController)

route.post("/api/v1/calender",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),CalenderContoller.addCalenderController)
route.get("/api/v1/getCalender",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),CalenderContoller.getCalenderController)

//staff Admin
route.get("/api/v1/getStudentById/:id",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),GetStudentController.getStudentController)

route.post("/api/v1/activity",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),ActivityController.addActivityController)
route.get("/api/v1/getActivity",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),ActivityController.getActivityController)

route.post("/api/v1/attendance",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),AttendanceController.addAttendanceController)

route.post("/api/v1/homework",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),HomeworkController.addHomeworkController)
route.get("/api/v1/getHomework",MiddleWare.authenticate,authorizeRoles(ROLE.ADMIN),HomeworkController.getHomeworkController)
route.put("/api/v1/editHomework", MiddleWare.authenticate, authorizeRoles(ROLE.ADMIN), HomeworkController.editHomeworkController);

route.post("/api/v1/circular",MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),CircularController.addCircularController)
route.get("/api/v1/getallCircular",CircularController.getallCircularController)
route.get("/api/v1/getStaffCircular",CircularController.getStaffCircularController)
route.get("/api/v1/getStudentCircular",CircularController.getStudentCircularController)

//Student Admin
route.get("/api/v1/getStudentHomework/:id",MiddleWare.authenticate,authorizeRoles(ROLE.USER),getHomeworkController.getHomeworkController)

route.get("/api/v1/getStudentActivity/:id",MiddleWare.authenticate,authorizeRoles(ROLE.USER),getActivityController.getActivityController)

route.get("/api/v1/getAttendance/:id",MiddleWare.authenticate,authorizeRoles(ROLE.USER),getAttendanceController.getAttendanceController)

//User Page
route.post("/api/v1/header",upload.single('logo'),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),HeadingController.addHeadingController)
route.get("/api/v1/getHeader", HeadingController.getHeadingController);
route.post("/api/v1/editHeader", upload.single("logo"), MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),HeadingController.editHeadingController);

route.post("/api/v1/gallery",upload.array('imagess',10),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),GalleryController.addGalleryController)
route.get("/api/v1/getGallery",GalleryController.getGalleryController)

route.post("/api/v1/member", upload.single("image"),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), ManagementController.addMemberController);
route.get("/api/v1/getMember", ManagementController.getAllMemberController);

route.post("/api/v1/hero", upload.fields([{ name: "heroBackground" }, { name: "heroIcon" }]),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), userHeroController.addHeroController);
route.get("/api/v1/hero", userHeroController.getHeroController);
route.post("/api/v1/hero/update/:id", upload.fields([{ name: "heroBackground" }, { name: "heroIcon" }]), MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),userHeroController.editHeroController);

route.post("/api/v1/userActivity", upload.single('img'), MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN),userActivityController.addActivityController);
route.get("/api/v1/getUserActivity", userActivityController.getActivityController);
route.post("/api/v1/editUserActivity/:id", upload.single('img'),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), userActivityController.editActivityController);

route.post("/api/v1/userTopper", upload.single('topperImg'),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), userToppersController.addTopperController);
route.get("/api/v1/getUserTopper",userToppersController.getTopperController);
route.post('/api/v1/editUserTopper/:id', upload.single('topperImg'),MiddleWare.authenticate,authorizeRoles(ROLE.SUPERADMIN), userToppersController.editTopperController);

//AI
route.post('/api/v1/chatbot', MiddleWare.authenticate,authorizeRoles(ROLE.USER),chatbotController.handleChatbotMessage);

route.get("/", (req, res) => {
    res.send("Success");
  });

  module.exports={route}