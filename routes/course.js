const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.send({
    message: "course route purchases",
  });
});
courseRouter.get("/preview", function (req, res) {});

module.exports = {
  courseRouter,
};
