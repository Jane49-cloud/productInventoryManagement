const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
  try {

    const { email, password , name } = req.body


    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      response.status(400);
      throw new Error("Email address already exists");
    }


    const user = await User.create({
        name,
        password,
        email
    });

    //validation
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Please fill in the required fields");
    }

    if (req.body.password.length < 6) {
      throw new Error("The password must be at least 6 characters");
    }

    
    //Send back data
    res.json(user);
    console.log(user, "User created successfully");
  } catch (error) {
    console.log(error, `error registering`);
  }
};

module.exports = {
  registerUser,
};
