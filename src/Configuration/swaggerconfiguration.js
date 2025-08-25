const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');
const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'School Project',
version: '1.0.0',
description: 'My API Description',
},
};
const hello =path.join(__dirname, '../Routing/adminSwagger.js')
console.log(hello)
const options = {
swaggerDefinition,
apis:[path.join(__dirname, '../Routing/adminSwagger.js'),path.join(__dirname, '../Routing/staffSwagger.js'),path.join(__dirname, '../Routing/studentSwagger.js'),path.join(__dirname, '../Routing/userSwagger.js')],
};

// fs.writeFileSync('./swagger-output.json', JSON.stringify(swaggerSpec, null, 2));

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

