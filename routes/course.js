process.env.con;
const { Router } = require("express");
const { PurchaseModel, CourseModel } = require("../Database/db");
const { userMiddleware } = require("../middleware/user");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await PurchaseModel.create({
    userId,
    courseId,
  });
  res.send({
    message: "course purchased",
  });
});
courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find({});
  res.json({
    courses,
  });
});

module.exports = {
  courseRouter,
};
