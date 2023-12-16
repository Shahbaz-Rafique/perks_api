var express = require('express');
var router = express.Router();
const controller=require('../../controller/sendEmail')

router.get('/', controller.sendEmail)
  
module.exports = router;