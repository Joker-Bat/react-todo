const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/userRouter");

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", function (req, res) {
  res.send("Its Working");
});

app.use("/users", userRouter);

module.exports = app;
