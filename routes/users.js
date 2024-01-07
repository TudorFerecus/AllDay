const express = require("express");
const router = express.Router();

const {checkAuthorization} = require('../middleware/generalFunctions');
const {register, login, getUser, getAllUsers, updateUser} = require("../controllers/usersController");

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUser').post(getUser);
router.route('/getAllUsers').get(getAllUsers);
router.route('/updateUser').put(checkAuthorization, updateUser);

module.exports = router;