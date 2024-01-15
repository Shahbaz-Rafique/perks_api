var express = require('express');
var router = express.Router();
const controller = require('../../controller/quotationsent');
const multer = require("multer");
const storageConfig = require("../../utils/multer");

const upload = multer({ storage: storageConfig.storage });

router.post('/', (req, res, next) => {
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'file1', maxCount: 1 }])(req, res, (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(500).send("Internal Server Error");
    }

    console.log("Received Files:", req.files);
    next();
  });
}, controller.QuotationSent);

module.exports = router;
