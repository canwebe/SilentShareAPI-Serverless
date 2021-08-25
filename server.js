const express = require('express')
const { connect } = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000

const connectDB = require('./config/db')
connectDB()

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
