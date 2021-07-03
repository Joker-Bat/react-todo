const express = require("express");

const router = express.Router();

// UserController
const { getAllUsers, addUser } = require("../controllers/userController");

router.get("/", getAllUsers).post("/", addUser);

module.exports = router;
