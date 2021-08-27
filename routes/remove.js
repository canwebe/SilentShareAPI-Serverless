const router = require('express').Router()
const File = require('../models/file')
const fs = require('fs')
router.get('/:uuid', async (req, res) => {
  const files = await File.find({
    uuid: req.params.uuid,
  })
  if (files.length) {
    files.forEach(async (file) => {
      try {
        fs.unlinkSync(`${__dirname}/../${file.path}`)
        await file.remove()
        console.log(`successfully deleted ${file.filename}`)
        return res.json({
          message: 'Job done All Clear',
        })
      } catch (err) {
        console.log(`error while deleting file ${err} `)
        return res.json({
          message: 'Negative',
        })
      }
    })
  }
})

module.exports = router
