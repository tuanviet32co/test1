const mongoose = require("mongoose");

const Term = require("../models/Term");
const Category = require("../models/Category");
const Major = require("../models/Major");
const Course = require("../models/Course");
const majorsData = require("./major.json");
const categoriesData = require("./category.json");
const coursesData = require("./course.json");
const mongoUrl = require("../mongoUrl");

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const getTerm = async (termName) => {
  const existingTerm = await Term.findOne({ name: termName });
  if (existingTerm) {
    return existingTerm;
  } else {
    const newTerm = await Term.create({ name: termName });
    console.log("\n>> Created Term:\n", newTerm);
    return newTerm;
  }
};

const getCategory = async (categoryCode) => {
  const existingCategory = await Category.findOne({ code: categoryCode });
  if (existingCategory) {
    return existingCategory;
  } else {
    const foundData = categoriesData.find(v => v.code === categoryCode);
    const newCategory = await Category.create(foundData);
    console.log("\n>> Created Category:\n", newCategory);
    return newCategory;
  }
};


const getCategories = async (categoriesCode) => {
  if (!categoriesCode) return [];
  const codes = categoriesCode.split(',').map(v => v.trim());
  let ans = [];

  for (const code of codes) {
    const cc = await getCategory(code);
    ans.push(cc);
  }

  return ans;
};


const getMajor = async (code) => {
  const spaceIndex = code.indexOf(' ');
  const majorCode = code.slice(0, spaceIndex);

  const existingMajor = await Major.findOne({ code: majorCode });
  if (existingMajor) {
    return existingMajor;
  } else {
    const newMajor = await Major.create(majorsData.find(v => v.code === majorCode));
    console.log("\n>> Created Major:\n", newMajor);
    return newMajor;
  };
}

const getLevel = (code) => {
  const spaceIndex = code.indexOf(' ');
  return parseInt(code[spaceIndex + 1], 10);
};

const createCourses = async () => {
  console.log('---Run migration Start---');
  
  const existingDB = await Category.findOne();
  if (existingDB) {
    mongoose.disconnect();
    console.log('---Migration only run 1 times---');
    return;
  }

  for (const course of coursesData) {
    const categories = await getCategories(course.Category);
    const term = await getTerm(course.Term);
    const major = await getMajor(course.Code);
    const level = await getLevel(course.Code);

    await Course.create({
      name: course.Name,
      code: course.Code,
      term: term._id,
      major: major._id,
      session: course.Session,
      faculty: course.Faculty,
      level,
      category: categories.map(c => c._id),
    });
  }

  mongoose.disconnect();
  console.log('---Run migration Done---');
};

createCourses();