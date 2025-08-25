const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { TOKENTYPE } = require('./Enums');
const { errorResponse } = require('../Utilities/ApiResponse');
const { decode } = require('punycode');


const privateKey = fs.readFileSync(path.join(__dirname, '../../keys/private.key'), 'utf8');
// console.log(privateKey)

function accessToken(id, email,role) {
  console.log(role,"role")

  const payload = {
    userId: id,
    data:email,
    role :role,
    mod : TOKENTYPE.ACCESSTOKEN
  };


  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS512',
    expiresIn: '1h' 
  });

  return token;
}
// console.log(JwtToken())
function refreshToken(id, email,role) {
  const payload = {
    userId: id,
    data:email,
    role :role,
    mod : TOKENTYPE.REFRESHTOKEN
  };


  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS512',
    expiresIn: '1d' 
  });

  return token;
}
// console.log(JwtToken())
const publicKey = fs.readFileSync(path.join(__dirname, '../../keys/public.key'), 'utf8');

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS512'] });
    // console.log(decoded,"verify")
     const now = Math.floor(Date.now() / 1000);
    const remaining = decoded.exp - now;

    console.log(`Token is valid. Time left: ${remaining} seconds`);
    return decoded;
  } catch (err) {
    return err;
  }
}

module.exports = { accessToken,refreshToken, verifyToken };


