const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('../routes')
const serverless = require('serverless-http')

//databse
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err))

//middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

//Routes
app.use('/api', routes)

module.exports.handler = serverless(app)
