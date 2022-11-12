const { response } = require('express');
const User = require('../models/user')

const registerUser = async(req, res)=>{
    try {
        const user = await User.create(req.body)
        res.json(user)
       console.log(user, "User created successfully")
    } catch (error) {
    console.log(error , `error registering`);
   
    }
}



module.exports = {
    registerUser,
}