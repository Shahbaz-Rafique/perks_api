var express = require('express');
var router = express.Router();
const controller=require('../../controller/getDetailsComp')

router.get('/', controller.getDetailComp);
  
module.exports = router;