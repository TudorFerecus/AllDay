const Users = require('../models/users');

const { StatusCodes } = require('http-status-codes');
const {getUserSearchFilter} = require('../middleware/generalFunctions')
const {cloudinary} = require('../middleware/cloudinary')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const register = async (req, res) => {

    let bodyName = req.body.name;
    let bodyMail = req.body.mail;
    let bodyIP = "TODO"
    let profilePhoto = process.env.PROFILE_PHOTO_PLACEHOLDER;
    let bodyPassword = req.body.password;

    console.log(bodyIP);

    if(bodyName && bodyMail && bodyIP && bodyPassword)
    {
        const hashedPassword = await bcrypt.hash(bodyPassword, 10);

        const user = await Users.create({
            name: bodyName,
            mail: bodyMail,
            IP: bodyIP,
            password: hashedPassword,
            profilePhoto: profilePhoto
        })

        if(user)
        {
            const token = jwt.sign(user.toObject(), process.env.JWT, {algorithm: 'HS256', noTimestamp: true});

            return res.status(StatusCodes.OK).json({
                success: true,
                createdUser: user,
                token
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
                const token = jwt.sign(user.toObject(), process.env.JWT, {algorithm: 'HS256', noTimestamp: true});

                return res.status(StatusCodes.OK).json({
                    success: true,
                    user,
                    token
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

    const searchFilter = getUserSearchFilter(req.body);

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

const updateUser = async (req, res) => {

    const searchFilter = getUserSearchFilter(req.body);
    const user = await Users.findOne(searchFilter);

    if(user)
    {
        const newProfilePhoto = req.body.profilePhoto;

        if(newProfilePhoto)
        {
            let linkParse = user.profilePhoto.split('/');
            let fileName = linkParse[linkParse.length - 1].split('.')[0];
            console.log(fileName);
            if(user.profilePhoto != process.env.PROFILE_PHOTO_PLACEHOLDER)
                cloudinary.uploader
                    .destroy(fileName)
                    .then((result) => {});
            user.profilePhoto = newProfilePhoto;
        }
        await user.save();

        const token = jwt.sign(user.toObject(), process.env.JWT, {algorithm: 'HS256', noTimestamp: true});

        return res.status(StatusCodes.OK).json({
            success: true,
            user,
            token
        })
    }

    else
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            status: "Could not find user!"
        })
        

}

module.exports = {register, login, getUser, getAllUsers, updateUser};