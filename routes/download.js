const router = require('express').Router()
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
  const file = await File.findOne({
    uuid: req.params.uuid,
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
