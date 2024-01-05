const express = require("express");
const router = express.Router();

const {createNewStat, getStat, updateStat} = require("../controllers/statsController");

router.route('/createStat').post(createNewStat);
router.route('/getStat').post(getStat);
router.route('/updateStat').put(updateStat);

module.exports = router;