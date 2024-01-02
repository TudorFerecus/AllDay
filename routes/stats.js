const express = require("express");
const router = express.Router();

const {createNewStat, getStat} = require("../controllers/statsController");

router.route('/createStat').post(createNewStat);
router.route('/getStat').post(getStat);

module.exports = router;