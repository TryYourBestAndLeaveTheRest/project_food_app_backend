// src/middleware/authRoleMiddleware.js
module.exports = function (roles) {
  return function (req, res, next) {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  };
};
