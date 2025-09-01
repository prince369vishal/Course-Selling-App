const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.ADMIN_JWT_SECRET;
function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.send({
        message: "Something wrong",
      });
    }
  } catch (error) {}
}

module.exports = {
  adminMiddleware,
};
