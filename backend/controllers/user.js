const { response } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler =require('express-async-handler')
const bcrypt = require('bcryptjs')

//Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register user
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


// login user also start using async-handler

const loginUser= async (req, res) =>{
  const {email, password} = req.body;

  //validate request
  if(!email || !password){
    res.status(400)
    throw new Error('please enter add email and password')
  }
  // Check if user exists
   const user = await User.findOne({email})
   
   if(!user){
    res.status(400)
    throw new Error("User with that email not found , please register")
   }
   // user exists, Check if the password is correct
   const passwordCorrect = await bcrypt.compare(password, user.password) 

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

   if(user && passwordCorrect){
    const user  = req.body
    res.status(200).json(
        {
            user, // you may display all the fields too
            token
         }
    )
   }
   
   else{
     res.status(400)
    throw new Error("password or email incorrect")
   }



}

module.exports = {
  registerUser,
  loginUser,
};
