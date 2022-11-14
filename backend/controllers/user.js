const { response } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      response.status(400);
      throw new Error("Email address already exists");
    }

    const user = await User.create({
      name,
      password,
      email,
    });

    //generate a token
    const token = generateToken(user._id);

    //send HTTP-only cookie
    res.cookie("token", token, {
      Path: "/",     
      HttpOnly: true,
      Expires: new Date(Date.now() + 1000 * 86400), //1 day
      SameSite: "none",
      Secure: true,
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
    res.status(201).json({
      user,
      token,
    });
    console.log(user, "User created successfully");
  } catch (error) {
    console.log(error, `error registering`);
  }
};

module.exports = {
  registerUser,
};
