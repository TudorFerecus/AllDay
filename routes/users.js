const express = require("express");
const router = express.Router();

const {postUser, getUser, getAllUsers} = require("../controllers/usersController");

router.route('/postUser').post(postUser);
router.route('/getUser').get(getUser);
router.route('/getAllUsers').get(getAllUsers);

module.exports = router;