const DatabaseConnection = require("../../DatabaseConnection/DbConnection")

const addSuperAdminModel = (id, name, email, password) => {
    return new Promise((resolve, reject) => {
        const query = `Insert into superadmin_tbl(id,name,email,password) values(?,?,?,?)`;
        DatabaseConnection.query(query, [id, name, email, password], (error) => {
            if (error) {
                reject(error)
            }
            resolve("sucess")
        })
    })

}

const getSuperAdminModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'select name,email from superadmin_tbl where id=?';
        DatabaseConnection.query(query, [id], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = { addSuperAdminModel, getSuperAdminModel };








