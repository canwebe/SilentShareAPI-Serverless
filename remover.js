const connectDB = require('./config/db')
const File = require('./models/file')
const fs = require('fs')

connectDB()

async function removeData() {
  const files = await File.find({
    createdAt: { $lt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  })
  if (files.length) {
    files.forEach(async (file) => {
      try {
        fs.unlinkSync(file.path)
        await file.remove()
        console.log(`successfully deleted ${file.filename}`)
      } catch (err) {
        console.log(`error while deleting file ${err} `)
      }
    })
  }
  console.log('Cleared')
}

removeData().then(process.exit)
