const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const loginRequired = async (req, res, next) => {
  try {
    //check if the request has a cookie
    const token = req.cookies.token
     
   if (!token) {
      res.status(401);
      throw new Error(`Not authorized , please login`);
    }
    //verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    //get user information from token
    const user = await User.findById(verified.id).select("-password");

    //if the user does not exist
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error("Not authorized, register or login");
  }
};
module.exports = loginRequired;
