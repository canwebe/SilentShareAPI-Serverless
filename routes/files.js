const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const File = require('../models/file')

let storage = multer.diskStorage({
  destination: (req, file, fxn) => fxn(null, 'storage/'),
  filename: (req, file, fxn) => {
    const fileId = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`

    fxn(null, fileId)
  },
})

let upload = multer({
  storage,
  limit: {
    fileSize: 100000 * 70,
  },
}).single('myFile')

router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message })
    }

    if (!req.file) {
      return res.json({ error: 'File is not found' })
    }

    // database store
    const file = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uuid: req.body.uuid,
      path: req.file.path,
      size: req.file.size,
    })

    const response = await file.save()
    return res.json({
      file: `${process.env.APP_URL}/files/${response.uuid}`,
    })
  })
})

module.exports = router
