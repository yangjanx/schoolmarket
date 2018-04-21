var express = require('express')
var router = express.Router();
var api = require('./api')

router.get('/blog/getBlogAll', function(req, res, next) {
  // api.getBlogAll(req, res, next);
  res.send('Hello World!');
})

module.exports = router;