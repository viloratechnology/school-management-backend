const DatabaseConnection=require("../../DatabaseConnection/DbConnection")

const getActivityModel=(id)=>{
    return new Promise((resolve,reject)=>{
        const query=`select activities_tbl.id,activities_tbl.content,activities_tbl.title,activities_tbl.activities_date,standard_tbl.name as std,section_tbl.name as section
         from activities_tbl
         join standard_tbl
         on activities_tbl.standard_id=standard_tbl.id
         join section_tbl
         on activities_tbl.section_id=section_tbl.id
         join student_tbl
         on student_tbl.standard_id=standard_tbl.id and student_tbl.section_id=section_tbl.id
         where student_tbl.id=?`
        DatabaseConnection.query(query,[id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports={getActivityModel}