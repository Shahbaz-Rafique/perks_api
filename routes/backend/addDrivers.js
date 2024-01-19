var express = require('express');
var router = express.Router();
const controller=require('../../controller/addDrivers')

router.post('/', controller.Drivers)
  
module.exports = router;