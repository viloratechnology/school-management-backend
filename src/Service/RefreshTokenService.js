const { TOKENTYPE } = require('../JWT Service/Enums');
const jwtService = require('../JWT Service/JwtService');

function refreshTokenController(req,res){
 const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('token ')
    ? authHeader.split(' ')[1]
    : null;
    // console.log(token,"for refresh token")
  // if (!token) {
  //       return res.status(401).json({ error: 'Authorization header missing' });
  //   }
  const decoded = jwtService.verifyToken(token);
  // console.log(Object.values(decoded),"sdertyu8iop;lkjhgfdxcvghjiklkjhgfgyhu")
   if (decoded.mod === TOKENTYPE.ACCESSTOKEN) {
            return res.status(403).json({ error: 'Forbidden: Access Token not accepted' });
        // res.send(  'Forbidden: Access Token not accepted' );
         } 
    // else if(decoded.name==="TokenExpiredError"){
    //               return res.status(401).json({ error: 'refresh Toke expired' });
    // }
    else if(!decoded.exp || !decoded.exp){
return res.status(401).json({error:"Refresh Token Expired"})
    }
   
    res.send(toGentrateRefreshToken(decoded))

}

function toGentrateRefreshToken(decoded) {
    
return jwtService.accessToken(decoded.userId,decoded.data,decoded.role)

}


module.exports = {refreshTokenController}