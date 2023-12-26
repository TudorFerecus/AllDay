const Users = require('../db/users');
const { StatusCodes } = require('http-status-codes');

const postUser = async (req, res) => {

    let bodyMail = req.body.mail;
    let bodyPhone = req.body.phone;
    let bodyIP = req.body.IP;

    if(bodyMail && bodyPhone && bodyIP)
    {
        const user = await Users.create({
            mail: bodyMail,
            phone: bodyPhone,
            IP: bodyIP
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

    let bodyMail = req.body.mail;
    let bodyPhone = req.body.phone;
    let bodyIP = req.body.IP;
    let bodyID = req.body.ID;
    let searchFilter = {}

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