require('dotenv').config()
const mongoose = require('mongoose')

function connectDB() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection
  db.once('open', () => {
    console.log('DB connected')
  }).catch((error) => console.log('DB connection failed'))
}

module.exports = connectDB
