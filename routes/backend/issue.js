var express = require('express');
var router = express.Router();
const controller=require('../../controller/issue')

router.get('/', controller.Issue);
  
module.exports = router;