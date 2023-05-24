const express = require("express");
const auth = require("../auth");
const {
  registerUser,
  loginUser,
  getUserProfile,
  selectCourse,
  updateUserProfile,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);
router.put("/selectCourse", auth, selectCourse);

module.exports = router;
