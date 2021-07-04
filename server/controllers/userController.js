const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const perPage = 10;
    const page = +req.query.page || 1;
    const users = await User.find({})
      .skip(perPage * page - perPage)
      .limit(perPage);

    const userCount = await User.find({
      active: { $ne: false },
    }).countDocuments();
    res.status(200).json({
      status: "success",
      data: {
        users,
        current: page,
        pages: Math.ceil(userCount / perPage),
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

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const curUser = await User.findByIdAndUpdate(
      id,
      { name: req.body.name },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: curUser,
      },
    });
  } catch (err) {
    console.log("Error in updating user: ", err.message);
    res.status(200).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    await User.findByIdAndUpdate(
      id,
      { active: false },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("Error in deleting user: ", err.message);
    res.status(200).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const keyword = req.params.keyword;

    const users = await User.find({
      active: { $ne: false },
      name: { $regex: keyword, $options: "i" },
    })
      .skip(page * perPage - perPage)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      total: users.length,
      data: {
        users,
        current: page,
        pages: Math.ceil(users.length / perPage),
      },
    });
  } catch (err) {
    console.log("Error in deleting user: ", err.message);
    res.status(200).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};
