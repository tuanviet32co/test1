const express = require("express");
const auth = require("../auth");
const {
  getCourses, getCourseFilterOptions
} = require("../controllers/CourseController");

const router = express.Router();

router.get("/", auth, getCourses);
router.get("/filterOptions", auth, getCourseFilterOptions);

module.exports = router;
