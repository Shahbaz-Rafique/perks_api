var express = require('express');
var router = express.Router();
const controller=require('../../controller/insurer');
const multer = require("multer");
const storageConfig = require("../../utils/multer");

const upload = multer({ storage: storageConfig.storage });

router.post('/',upload.single("file"),controller.Insuere);
  
module.exports = router;