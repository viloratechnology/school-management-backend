const ROLE = require("./Enums");

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
      console.log(userRole,"USerorle")

  //   console.log(userRole!=ROLE.ADMIN )
  //   if(userRole!=ROLE.ADMIN || userRole!=ROLE.SUPERADMIN || userRole!=ROLE.USER){
  //  return res.status(403).json({ error: 'Forbidden: This is Not Right Token' });
  //   }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
}

module.exports = { authorizeRoles };
