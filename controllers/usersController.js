const Users = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

const postUser = async (req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyPhone = req.body.phone;
    let bodyIP = req.body.IP;
    let bodyPassword = req.body.password;

    if(bodyName && bodyMail && bodyPhone && bodyIP && bodyPassword)
    {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            name: bodyName,
            mail: bodyMail,
            phone: bodyPhone,
            IP: bodyIP,
            password: hashedPassword
        })

        if(user)
        {
            return res.status(StatusCodes.OK).json({
                success: true,
                createdUser: user
            });
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false
        })
    }

    else
    {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false
        })
    }
}

const getUser = async(req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyPhone = req.body.phone;
    let bodyIP = req.body.IP;
    let bodyID = req.body.ID;
    let searchFilter = {}

    if(bodyName)
        searchFilter.name = bodyName;

    if(bodyMail)
        searchFilter.mail = bodyMail;

    if(bodyPhone)
        searchFilter.phone = bodyPhone;

    if(bodyIP)
        searchFilter.IP = bodyIP;

    if(bodyID)
        searchFilter._id = bodyID;

    const user = await Users.findOne(searchFilter);

    if(user)
    {
        return res.status(StatusCodes.OK).json({
            success: true,
            user: user
        })
    }

    return res.status(StatusCodes.NOT_FOUND).json({
        success: false
    })


}

const getAllUsers = async (req, res) => {
    const users = await Users.find({})

    if(users)
    {
        return res.status(StatusCodes.OK).json({
            success: true,
            users: users
        })
    }

    return res.status(StatusCodes.NOT_FOUND).json({
        success: false
    })

}

module.exports = {postUser, getUser, getAllUsers};