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

    if (files.length) {
      files.map(async (file) => {
        try {
          await file.remove()
          console.log(`successfully deleted ${file.filename}`)
        } catch {
          return res.json({
            message: 'Error occured on removing files try again',
          })
        }
      })

      return res.json({
        message: 'All files are removed Successfully',
      })
    }
  } catch (err) {
    console.log('Not found searching', err)
    return res.json({
      message: 'Error',
    })
  }
})

module.exports = router
