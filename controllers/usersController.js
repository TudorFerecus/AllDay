const Users = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyIP = req.socket.localAddress;
    let bodyPassword = req.body.password;

    console.log(bodyIP);

    if(bodyName && bodyMail && bodyIP && bodyPassword)
    {
        const hashedPassword = await bcrypt.hash(bodyPassword, 10);

        const user = await Users.create({
            name: bodyName,
            mail: bodyMail,
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

const login = async (req, res) => {
    let mail = req.body.mail;
    let password = req.body.password;

    if(mail && password)
    {
        const user = await Users.findOne({mail: mail});
        if(user)
        {
            if(mail && bcrypt.compare(password, user.password))
            {
                const token = jwt.sign(user.toObject(), 'Andreea');

                return res.status(StatusCodes.OK).json({
                    success: true,
                    user: user,
                    token: token
                })
            }
        }
        else 
        {
            return res.json({success: false});
        }
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
        success: false
    })

}

const getUser = async(req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyIP = req.body.IP;
    let bodyID = req.body.ID;
    let searchFilter = {}

    if(bodyName)
        searchFilter.name = bodyName;

    if(bodyMail)
        searchFilter.mail = bodyMail;

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

module.exports = {register, login, getUser, getAllUsers};