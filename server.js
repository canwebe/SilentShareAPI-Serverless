const express = require('express')
const app = express()
const cors = require('cors')

const filesRoute = require('./routes/files')
const viewRoute = require('./routes/view')
const downloadRoute = require('./routes/download')
const removeRoute = require('./routes/remove')

// db
const connectDB = require('./config/db')
connectDB()

//middleware

const corsOptions = {
  origin: process.env.ALLOWED_CORS,
}
app.use(cors(corsOptions))

//Routes

app.use('/api/files', filesRoute)
app.use('/files', viewRoute)
app.use('/remove', removeRoute)
app.use('/files/download', downloadRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
