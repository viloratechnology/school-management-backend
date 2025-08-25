const DatabaseConnection = require("../../DatabaseConnection/DbConnection")

const AddActivityModel = (content, standard_id, section_id, createdBy, title, photoName, photoPath) => {

    return new Promise((resolve, reject) => {
        const query = `Insert into activities_tbl(content,standard_id,section_id,createdBy,title,photoName,photoPath) values(?,?,?,?,?,?,?)`;
        DatabaseConnection.query(query, [content, standard_id, section_id, createdBy, title, photoName, photoPath], (error) => {
            if (error) {
                reject(error)
            }
            resolve("ok")
        })
    })

}
const getActivityModel = () => {
    return new Promise((resolve, reject) => {
        const query = `select activities_tbl.id,activities_tbl.content,activities_tbl.title,activities_tbl.activities_date,standard_tbl.name as std,section_tbl.name as section
         from activities_tbl
         join standard_tbl
         on activities_tbl.standard_id=standard_tbl.id
         join section_tbl
         on activities_tbl.section_id=section_tbl.id`
        DatabaseConnection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}



module.exports = { AddActivityModel, getActivityModel };
