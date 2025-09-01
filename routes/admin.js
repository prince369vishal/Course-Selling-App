require("dotenv").config();
const { Router } = require("express");
const { AdminModel, CourseModel } = require("../Database/db");
const adminRouter = Router();
const { z } = require("zod");

const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");
const JWT_SECRET = process.env.ADMIN_JWT_SECRET;

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  try {
    await AdminModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    res.send({
      message: "Admin signed up",
    });
  } catch (error) {
    res.send({
      message: "Sign up failed",
    });
  }
});
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await AdminModel.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.send({
        token,
      });
    } else {
      res.send({
        message: "Sign in failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const creatorId = req.userId;

  const { title, description, imageURL, price } = req.body;
  const course = await CourseModel.create({
    title,
    description,
    imageURL,
    price,
    creatorId,
  });
  res.json({
    message: "course Created",
    courseId: course._id,
  });
});
adminRouter.put("/course", function (req, res) {});
adminRouter.get("/course/bulk", function (req, res) {});

module.exports = {
  adminRouter,
};
