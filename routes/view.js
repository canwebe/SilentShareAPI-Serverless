const router = require('express').Router()
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
  try {
    const file = await File.findOne({
      uuid: req.params.uuid,
    })
    if (!file) {
      return res.json({
        error: 'Link expires try again',
      })
    }

    return res.json({
      uuid: file.uuid,
      fileName: file.fileName,
      fileSize: file.size,
      link: `${process.env.APP_URL}/files/download/${file.uuid}`,
    })
  } catch (error) {
    return res.json({
      error: 'Something went wrong please try again',
    })
  }
})

module.exports = router
