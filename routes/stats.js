const express = require("express");
const router = express.Router();

const {createNewStat} = require("../controllers/statsController");

router.route('/createStat').post(createNewStat);

module.exports = router;