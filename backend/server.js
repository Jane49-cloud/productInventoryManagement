const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const connection = require('./connection/db')
const userRoute = require('./routes/user')
const errorHandler = require('./middleware/errors')
const cookieParser = require("cookie-parser")


const app = express()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

//Routing configuration
app.use("/api/users", userRoute)


//routing
app.get("/", (req,res)=>{
    res.send(
        "Inventory management app"
    )
})
const port = process.env.PORT || 8001


// error handling

app.use(errorHandler)
const start = async()=>{
    await connection()
   app.listen(port, console.log(`The sevrver is running on:${port}`))
}
start()