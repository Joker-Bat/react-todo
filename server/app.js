const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", function (req, res) {
  res.send("Its Working");
});

app.use("/users", userRouter);

module.exports = app;
