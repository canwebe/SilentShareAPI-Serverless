const router = require('express').Router()
const File = require('../models/file')

router.get('/:filename', async (req, res) => {
  const file = await File.findOne({
    filename: req.params.filename,
  })
  if (!file) {
    return res.json({
      error: 'Link expired try new link',
    })
  }
  const downloadPath = `${__dirname}/../${file.path}`
  res.download(downloadPath)
})

module.exports = router
