const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const connection = require('./connection/db')

const app = express()





const port = process.env.PORT || 8001

const start = async()=>{
    await connection()
   app.listen(port, console.log(`The sevrver is running on:${port}`))
}
start()