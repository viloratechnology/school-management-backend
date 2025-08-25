
const DatabaseConnection=require("../../DatabaseConnection/DbConnection")

const AttendanceModel=(ans)=>{

const value=ans.map((items)=>[items.id,items.morning,items.afternoon,items.stdid,items.sectionid])
console.log(value,"value")
    return new Promise((resolve,reject)=>{
        const query=`Insert into attendance_tbl(student_id,FORENOON,AFTERNOON,standard_id,section_id) values ?`;
        DatabaseConnection.query(query,[value],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result,"ok")
        })
    })

}

module.exports={AttendanceModel};
