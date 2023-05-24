const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registerUser = async (request, response) => {
  const { password, ...rest } = request.body;
  // hash the password
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        ...rest,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((_result) => {
          response.status(201).send({
            message: "User Created Successfully",
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
};

exports.loginUser = async (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
};

exports.getUserProfile = async (request, response) => {
  const { userId } = request.user;
  try {
    const user = await User.findById(userId)
      .select('-password')
      .populate('major', '-__v')
      .populate('minor', '-__v')
      .populate('selectedCourses', '-__v');

    response.status(200).send(user);
  } catch (e) {
    response.status(500).json(e);
  }
}

exports.updateUserProfile = async (request, response) => {
  const { userId } = request.user;
  const { key, value } = request.body;
  const parsedVal = key === 'password' ? await bcrypt.hash(value, 10) : value;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { [key]: parsedVal },
      { new: true }
    ).populate(key, '-__v');
    response.status(200).send(user[key]);
  } catch (e) {
    response.status(500).json(e);
  }
}

exports.selectCourse = async (request, response) => {
  const { userId } = request.user;
  const { courseId, action } = request.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      action === 'add' ? { $push: { selectedCourses: courseId } } : { $pull: { selectedCourses: courseId } },
      { new: true }
    );
    response.status(200).send({ message: 'message' })
  } catch (e) {
    response.status(500).json(e);
  }
}