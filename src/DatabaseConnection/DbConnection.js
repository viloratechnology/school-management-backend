
const mysql = require("mysql2");
const data=require("../Configuration/DbConfig")

const connection=mysql.createConnection(data);
// console.log(connection)

module.exports = connection;