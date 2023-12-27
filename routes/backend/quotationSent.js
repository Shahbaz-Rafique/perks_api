var express = require('express');
var router = express.Router();
const controller=require('../../controller/quotationsent')

router.post('/', controller.QuotationSent)
  
module.exports = router;