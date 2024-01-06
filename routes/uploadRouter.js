const express = require("express");
const router = express.Router();
const {uploadImage} = require('../controllers/uploadController')

router.route('/uploadImage').post(uploadImage);

module.exports = router;