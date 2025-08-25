    const ROLE = Object.freeze({
      USER: "STUDENT",
      ADMIN: "STAFF",
      SUPERADMIN: "PRINCIPLE"
    });
     const TOKENTYPE = Object.freeze({
      ACCESSTOKEN: "__as_secure",
      REFRESHTOKEN: "__rs_secure"
    });

module.exports = {ROLE,TOKENTYPE}

//   try {
//         const decoded = jwtService.verifyToken(token);
//         // console.log(decoded, "tokenDecode");
//     if (decoded.type === TOKENTYPE.ACCESSTOKEN) {
//                 if (decoded) {
//                     req.user = decoded;
//                     console.log(req.user)
//                     return next();
//                 } else {
//                     return res.status(403).json({ error: 'Forbidden: Invalid token' });
//                 }
//          } else if (decoded.type === TOKENTYPE.REFRESHTOKEN) {
//             // throw new Error("Refresh Token");
//              if (decoded) {
//                     req.mod = decoded;
//                     // if(req.mod)
//                     return ;
//                 } else {
//                     return res.status(403).json({ error: 'Forbidden: Invalid token' });
//                 }

//         } else {
//              throw new Error("Invalid token type");
// }


//     } catch (error) {
//         console.error("JWT verification failed:", error);
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }
