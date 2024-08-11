const express = require("express");
const {
  registerUser,
  authUser,
  authenticateToken,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);

module.exports = router;
