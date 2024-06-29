require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

const app = express()

//Config JSON and Data Response
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Solve CORS Policy
app.use(cors({credentials: true, origin: "http://localhost:5000"}))

//Upload Directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//DB Connection
require('./config/db.js')

//Routes
const router = require('./routes/Router')
app.use(router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})