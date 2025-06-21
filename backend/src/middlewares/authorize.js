module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permission' });
    }
    console.log("🔐 Authorizing role:", req.user?.role);
    next();
  };
};
