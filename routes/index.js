const router = require('express').Router()
const File = require('../models/file')

router.post('/upload', async (req, res) => {
  // database store
  const file = new File({
    filename: req.body.uniqueName,
    originalname: req.body.originalname,
    uuid: req.body.uuid,
    url: req.body.url,
    size: req.body.size,
  })

  const response = await file.save()
  return res.json({
    message: 'File uploaded',
  })
})

router.get('/files/:uuid', async (req, res) => {
  try {
    const files = await File.find({
      uuid: req.params.uuid,
    })
    if (!files) {
      return res.json({
        error: 'Link expires try again',
      })
    }
    return res.json(files)
  } catch (error) {
    return res.json({
      error: 'Something went wrong please try again',
    })
  }
})

router.get('/remove/:uuid', async (req, res) => {
  try {
    const files = await File.find({
      uuid: req.params.uuid,
    })
    // mongoose.connection.close()
    if (files.length) {
      files.forEach(async (file) => {
        try {
          await file.remove()
          console.log(`successfully deleted ${file.filename}`)
        } catch (err) {
          console.log(`error while deleting file ${err} `)
          return res.json({
            message: 'Negative',
          })
        }
      })
      return res.json({
        message: 'Job done All Clear',
      })
    }
  } catch (err) {
    console.log('Not found searching', err)
  }
})

module.exports = router