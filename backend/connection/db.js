const mongoose = require('mongoose');
require('dotenv').config()

const connection = async () => {
const db = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}
try {
    mongoose.connect(process.env.MONGO_URI, db)
    console.log("Database connection established...")
} catch (error) {
    console.log(error, {msg: `Database connection error`})
}
}

module.exports = connection