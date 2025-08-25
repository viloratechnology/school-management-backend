const DatabaseConnection = require("../../DatabaseConnection/DbConnection")


const getHomeworkModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `select homework_tbl.id,homework_tbl.content,homework_tbl.title,homework_tbl.homework_date,standard_tbl.name as std,section_tbl.name as section,homework_tbl.due_date
         from homework_tbl
         join standard_tbl
         on homework_tbl.standard_id=standard_tbl.id
         join section_tbl
         on homework_tbl.section_id=section_tbl.id
         join student_tbl
         on student_tbl.standard_id=standard_tbl.id and student_tbl.section_id=section_tbl.id
         where student_tbl.id=?`
        DatabaseConnection.query(query, [id], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}


module.exports = { getHomeworkModel }