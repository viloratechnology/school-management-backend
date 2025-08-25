const dotEnv = require("dotenv") ;

dotEnv.config()

// console.log(process.env)

let value = process.env;
const db={
    host:value.DATABASE_HOST,
    user:value.DATABASE_USER,
    password:value.DATABASE_PASSWORD,
    database:value.DATABASE_NAME,
    Port:value.DATABASE_PORT,
}

module.exports=db; 