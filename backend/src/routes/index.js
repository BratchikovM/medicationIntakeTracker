var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ success: true, redirect_url: 'asd' })
})

module.exports = router
