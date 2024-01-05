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

const daysFromDate = (date) => {
    let daysParse = date.split(' ')[0].split('-');
    let daysSum = 365 * (parseInt(daysParse[0]) - 1) + 30 * (parseInt(daysParse[1]) - 1) + parseInt(daysParse[2]);
    return daysSum
}

const minuteFromDate = (date) => {
    let timeParse = date.split(' ')[1].split(':');
    let minSum = 60 * parseInt(timeParse[0]) + parseInt(timeParse[1]);
    return minSum
}

module.exports = {getUserSearchFilter, validateUser, daysFromDate, minuteFromDate}