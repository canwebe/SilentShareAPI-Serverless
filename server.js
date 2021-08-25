const express = require('express')
const app = express()

const filesRoute = require('./routes/files')
const viewRoute = require('./routes/view')
const downloadRoute = require('./routes/download')
// db
const connectDB = require('./config/db')
connectDB()

//Routes

app.use('/api/files', filesRoute)
app.use('/files', viewRoute)
app.use('/files/download', downloadRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
