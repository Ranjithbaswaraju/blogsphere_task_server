const express = require("express");
const {
  loginController,
  logOutController,
  signUpController,
} = require("../Controllers/authControllers.js");
const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", logOutController);

module.exports = router;
