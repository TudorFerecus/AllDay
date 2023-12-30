const express = require("express");
const router = express.Router();

const {register, login, getUser, getAllUsers} = require("../controllers/usersController");

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/getUser').get(getUser);
router.route('/getAllUsers').get(getAllUsers);

module.exports = router;