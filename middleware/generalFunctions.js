const jwt = require('jsonwebtoken')

require('dotenv').config();

const getUserSearchFilter = (body) => {
    let bodyName = body.name;
    let bodyMail = body.mail;
    let bodyIP = body.IP;
    let bodyID = body.ID;
    let searchFilter = {}

    if(bodyName)
        searchFilter.name = bodyName;

    if(bodyMail)
        searchFilter.mail = bodyMail;

    if(bodyIP)
        searchFilter.IP = bodyIP;

    if(bodyID)
        searchFilter._id = bodyID;

    return searchFilter

}

const validateUser = (user, token) => {
    const realToken = jwt.sign(user.toObject(), process.env.JWT, {algorithm: 'HS256', noTimestamp: true});

    if(realToken == token) return true;
    return false;

}

module.exports = {getUserSearchFilter, validateUser}