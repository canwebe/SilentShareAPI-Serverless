const router = require('express').Router()
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
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

module.exports = router
