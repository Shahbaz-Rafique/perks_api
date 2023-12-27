var express = require('express');
var router = express.Router();
const controller=require('../../controller/getdetails')

router.get('/', controller.getDetails);
  
module.exports = router;