require("dotenv").config();
const { Router } = require("express");
const { UserModel, PurchaseModel } = require("../Database/db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.USER_JWT_SECRET;

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    await UserModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }

  res.json({
    message: "Signup successful",
  });
});
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

userRouter.get("/purchases", async function (req, res) {
  const userId = req.userId;

  const purchases = await PurchaseModel.find({
    userId,
    courseId,
  });

  res.json({
    purchases,
  });
});

module.exports = {
  userRouter,
};
