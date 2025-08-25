
const express = require("express")
const con = require("../src/DatabaseConnection/DbConnection")
const Routes=require("../src/Routing/Routes")
const cors=require('cors')
const cookieParser = require('cookie-parser'); 
const path=require('path')
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./Configuration/swaggerconfiguration');
const initialise=express()
initialise.use(cookieParser()); 
con.connect((error)=>{
    if(error){
        console.log(error)
    }   
    else{
 console.log("databse connected")
    initialise.listen(4000,"0.0.0.0",()=>{
        console.log("connect success")
    })
   
    }
   
})
initialise.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
  explorer: true,
}));

// initialise.use(cors({
//     origin :["http://localhost:5173","http://192.168.0.150:4100",],
//     credentials:true
// }))

initialise.use(cors({
  origin: [
    "http://localhost:5173",          // For web dev
    "http://192.168.0.104:4100",      // Your local IP (emulator testing)
    "http://localhost:8081"                // Fallback
  ],
  credentials: true
}))


// Serve Swagger documentation


initialise.use(Routes.route)

// initialise.use(setCorsHeaders);
// function setCorsHeaders(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   }
initialise.use('/api/v1/uploads', express.static(path.resolve(__dirname,'uploads')))


