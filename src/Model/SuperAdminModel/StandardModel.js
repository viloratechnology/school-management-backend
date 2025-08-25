
const DatabaseConnection = require("../../DatabaseConnection/DbConnection")

const addStandardModel = (name, createdBy) => {
    return new Promise((resolve, reject) => {
        const query = `Insert into standard_tbl(name,createdBy) values(?,?)`;
        DatabaseConnection.query(query, [name, createdBy], (error,result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })

}
const getStandardModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'select id, name from standard_tbl where isDeleted=0'
        DatabaseConnection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}


const editStandardModel = (Standard, id, updatedBy) => {
    return new Promise((resolve, reject) => {
        DatabaseConnection.query(`UPDATE standard_tbl SET name=?,updatedBy=? where id=?`, [Standard, updatedBy, id], (error, result) => {
            if (error) {
                return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}

const deleteStandardModel = (id) => {
    return new Promise((resolve, reject) => {
        DatabaseConnection.query(`UPDATE standard_tbl SET isDeleted=1 where id=?`,[id], (error, result) => {
            if (error) {
                reject(error)
            }
            else {
                // console.log(result)
                resolve(result)
            }
        })
    })
}



module.exports = { addStandardModel, getStandardModel, editStandardModel,deleteStandardModel };
