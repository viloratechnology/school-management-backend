// const HomeworkService=require("../../Service/StudentAdminService/getHomeworkService")


// const getHomeworkController = async (req, res) => {
//     try {
//         const id=req.params["id"]

//         await HomeworkService.getHomeworkService(id)
//         .then((result)=>{
//             res.send({data:result.data,date:result.datevalue})
//          })

//     } catch (error) {
//         res.send("Error retrieving data");
//     }
// }

// module.exports={getHomeworkController}


const HomeworkService = require("../../Service/StudentAdminService/getHomeworkService");
const { successResponse, errorResponse } = require("../../Utilities/ApiResponse");

const getHomeworkController = async (req, res) => {
    try {
        const id = req.params["id"];
        const result = await HomeworkService.getHomeworkService(id);
        return res.status(200).json(successResponse("Get home work Successfully",{data: result.data,date: result.datevalue}));
    }
    catch (error) {
        return res.status(500).json(errorResponse("Home Work Not Get",error));
    }
};

module.exports = { getHomeworkController };
