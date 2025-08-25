
const DatabaseConnection = require("../../DatabaseConnection/DbConnection")

const addSectionModel = (name, createdBy) => {
    return new Promise((resolve, reject) => {
        const query = `Insert into section_tbl(name,createdBy) values(?,?)`;
        DatabaseConnection.query(query, [name, createdBy], (error,result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })

}
const getSectionModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'select id,name from section_tbl where isDeleted=0'
        DatabaseConnection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const editSectionModel = (Section, id, updatedBy) => {
    return new Promise((resolve, reject) => {
        DatabaseConnection.query(`UPDATE section_tbl SET name=?,updatedBy=? where id=?`, [Section, updatedBy, id], (error, result) => {
            if (error) {
                return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}

const deleteSectionModel = (id) => {
    return new Promise((resolve, reject) => {
        DatabaseConnection.query(`UPDATE section_tbl SET isDeleted=1 where id=?`,[id], (error, result) => {
            
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = { addSectionModel, getSectionModel, editSectionModel,deleteSectionModel };
