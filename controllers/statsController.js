const Stats = require('../models/stats')
const Users = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const {getUserSearchFilter, validateUser} = require('../middleware/generalFunctions')

require('dotenv').config();

const createNewStat = async (req, res) => {
    const token = req.body.token;
    
    const searchFilter = getUserSearchFilter(req.body)

    const user = await Users.findOne(searchFilter);

    if(user && validateUser(user, token))
    {
        try {
            const stat = await Stats.create({
                user: user._id,
                lastOnline: "Never",
                totalTime: "0",
                tasksDone: "0",
                tasksPending: "0"
            });

            if(stat) 
                return res.status(StatusCodes.OK).json({
                    success: true,
                    stat
                })
            else
                return res.status(StatusCodes.OK).json({
                    success: false,
                })
        } catch(error) {
            return res.json({
                success: false,
                status: error
            })
        }
    }
    else 
    {
        return res.status(StatusCodes.OK).json({
            success: false,
            status: "no user with the filters or bad token"
        })
    }



}

module.exports = {createNewStat}