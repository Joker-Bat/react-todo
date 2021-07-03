const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
    });
    res.status(200).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (err) {
    console.log("On Add User: ", err.message);
    res.status(200).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};
