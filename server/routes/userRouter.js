const express = require("express");

const router = express.Router();

// UserController
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.post("/", addUser);

router.route("/:userId").patch(updateUser).delete(deleteUser);

router.get("/search/:keyword", searchUser);

module.exports = router;
