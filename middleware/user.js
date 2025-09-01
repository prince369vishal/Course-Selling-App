const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.USER_JWT_SECRET;
function userMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.send({
        message: "Something went wrong",
      });
    }
  } catch (error) {}
}

module.exports = {
  userMiddleware,
};
