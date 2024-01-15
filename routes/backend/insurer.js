var express = require('express');
var router = express.Router();
const controller=require('../../controller/quotationsent');
const multer = require("multer");
const storageConfig = require("../../utils/multer");

const upload = multer({ storage: storageConfig.storage });

router.post('/',upload.fields([{ name: 'file', maxCount: 1 }, { name: 'file1', maxCount: 1 }]),controller.QuotationSent);
  
module.exports = router;