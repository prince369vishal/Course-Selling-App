require("dotenv").config();
const { Router } = require("express");
const { AdminModel } = require("../Database/db");
const adminRouter = Router();
const { z } = require("zod");

const jwt = require("jsonwebtoken");
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
adminRouter.post("/course", function (req, res) {});
adminRouter.put("/course", function (req, res) {});
adminRouter.get("/course/bulk", function (req, res) {});

module.exports = {
  adminRouter,
};
