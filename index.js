const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "X@123You";
app.use(express.json());

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

//PORT
app.listen(3000);
