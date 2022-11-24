const express = require("express");
const router = express.Router();
const loginRequired = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/user");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.get("/getuser", loginRequired, getUser);

module.exports = router;
