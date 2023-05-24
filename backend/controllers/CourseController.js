const { Types } = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Course");
const Major = require("../models/Major");
const Term = require("../models/Term");
const User = require("../models/User");

exports.getCourses = async (request, response) => {
  const { page, pageSize = 10, terms, majors, categories, q, isSelected } = request.query;
  const pageVal = parseInt(page, 10);
  const perPageVal = parseInt(pageSize, 10);

  let selectedCourses;
  if (isSelected) {
    const { userId } = request.user;
    const user = await User.findById(userId);
    selectedCourses = user.get('selectedCourses');
  }

  const query = {
    ...selectedCourses ? {
      '_id': {
        $in: selectedCourses.map(v => Types.ObjectId(v))
      }
    } : {},
    ...q ? {
      $or: [
        { name: { "$regex": q, "$options": "i" } },
        { code: { "$regex": q, "$options": "i" } },
        { faculty: { "$regex": q, "$options": "i" } }
      ]
    } : {},
    ...terms ? {
      'term': {
        $in: terms.split(',').map(v => Types.ObjectId(v))
      }
    } : {},
    ...majors ? {
      'major': {
        $in: majors.split(',').map(v => Types.ObjectId(v))
      }
    } : {},
    ...categories ? {
      'category': {
        $in: categories.split(',').map(v => Types.ObjectId(v))
      }
    } : {}
  };
  await Course.find(query)
    .skip((pageVal - 1) * perPageVal)
    .limit(perPageVal)
    .select('-__v')
    .populate('category', '-__v')
    .populate('term', '-__v')
    .populate('major', '-__v')
    .exec((error, courses) => {
      if (error) {
        response.status(500).json(error);
        return;
      }
      Course.countDocuments(query).exec((countError, count) => {
        if (countError) {
          response.status(500).json(err).json(countError);
          return;
        }
        response.status(200).send({
          docs: courses,
          total: count,
        });
      });
    });
};

exports.getCourseFilterOptions = async (_request, response) => {
  const [terms, majors, categories] = await Promise.all([
    Term.find().select('-__v'),
    Major.find().select('-__v'),
    Category.find().select('-__v'),
  ]);

  response.status(200).send({
    terms: terms.map(v => ({ label: v.name, value: v.id })),
    majors: majors.map(v => ({ label: v.name, value: v.id })),
    categories: categories.map(v => ({ label: v.name, value: v.id })),
  });
};
