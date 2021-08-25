const express = require('express')
const app = express()

const filesRoute = require('./routes/files')

// db
const connectDB = require('./config/db')
connectDB()

//Routes

app.use('/api/files', filesRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
