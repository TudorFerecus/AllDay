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

const getStat = async (req, res) => {
    const token = req.body.token; 
    const searchFilter = getUserSearchFilter(req.body)

    const user = await Users.findOne(searchFilter);

    if(user)
    {

        if(validateUser(user, token))
        {
            const stat = await Stats.findOne({user: user._id})
            if(stat)
            {
                return res.status(StatusCodes.OK).json({
                    success: true,
                    stat
                })
            }
            else 
            {
                return res.status(StatusCodes.OK).json({
                    success: false,
                    status: "No stats assigned to user"
                });
            }
        }
        else 
        {
            return res.status(StatusCodes.OK).json({
                success: false,
                status: "Couldn't validate user"
            });
        }
    }
    else
    {
        return res.status(StatusCodes.OK).json({
            success: false,
            status: "Incorrect credentials"
        })
    }

}

const updateStat = async (req, res) => {
    const token = req.body.token; 
    const searchFilter = getUserSearchFilter(req.body)

    const user = await Users.findOne(searchFilter);

    if(user)
    {
        if(validateUser(user, token))
        {
            const stat = await Stats.findOne({user: user._id})
            if(stat)
            {
                const lastOnline = req.body.lastOnline;
                const taskDone = req.body.taskDone;
                const newTask = req.body.newTask;
                const totalTime = req.body.totalTime;
                const plusTime = req.body.plusTime;

                if(lastOnline)
                    stat.lastOnline = lastOnline;
                if(taskDone)
                    stat.tasksDone.append(taskDone);
                if(newTask)
                    stat.tasksPending.append(newTask);
                if(totalTime)
                    stat.totalTime = totalTime;
                if(plusTime)
                    stat.totalTime += plusTime;

                await stat.save();

                return res.status(StatusCodes.OK).json({
                    success: true,
                    stat
                })
            }
            else 
            {
                return res.status(StatusCodes.OK).json({
                    success: false,
                    status: "No stats assigned to user"
                });
            }
        }
        else 
        {
            return res.status(StatusCodes.OK).json({
                success: false,
                status: "Couldn't validate user"
            });
        }
    }
    else
    {
        return res.status(StatusCodes.OK).json({
            success: false,
            status: "Incorrect credentials"
        })
    }
}

module.exports = {createNewStat, getStat, updateStat}