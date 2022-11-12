const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "password must be at least 6 characters"],
    maxLength: [23, "password must be at most 23 characters"],
  },
  photo: { type: String, required: true ,
    default: "https://i.ibb.co/4pDNDk1/avatar.png"},
    phone:{type:String, default: "+245"},
    bio:{
        type:String, 
        maxLength:[250, "bio must be at most 250 characters"],
        default: "bio should be at most 250 characters"
    }
},
{
    timestamps:true
}

);

module.exports = mongoose.model("User", userSchema);
