const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser)

module.exports = router;

// Stopped at 02.07.06