const Connection = require('../models/connection.js');
const { StatusCodes } = require('http-status-codes');
const { daysFromDate, minuteFromDate } = require('../middleware/generalFunctions.js')
const Stats = require('../models/stats.js')
const Users = require('../models/users.js')

const getAllConnections = async (req, res) => {

    const allConnections = await Connection.find({});
    if(allConnections)
    {
        return res.status(StatusCodes.OK).json({
            success: true, 
            connection : allConnections
        });
    }

}

const getLastConnection = async (req, res) => {
    const allConnections = await Connection.find({});
    if(allConnections)
    {
        let connectionLen = allConnections.length;
        return res.status(StatusCodes.OK).json({
            success: true, 
            connection : allConnections[connectionLen - 1]
        });
    }
}

const postConnection = async (req, res) => {

    const usersBody = req.body.users;
    const dateTimeBody = req.body.dateTime;

    const allConnections = await Connection.find({});
    

    if(usersBody && dateTimeBody)
    {

        for(let userIP of usersBody)
        {
            const user = await Users.findOne({"IP": userIP})
            
            if(user)
            {
                const stat = await Stats.findOne({"user": user._id});
                
                if(stat)
                {   
                    if(allConnections.length != 0)
                    {
                        const lastConnection = allConnections[allConnections.length - 1];
                        if(lastConnection.users.includes(userIP))
                        {
                            let dayDiff = (parseInt(daysFromDate(dateTimeBody)) - parseInt(daysFromDate(stat.lastOnline))) * 1440;

                            let totalDiff = dayDiff + (parseInt(minuteFromDate(dateTimeBody)) - parseInt(minuteFromDate(stat.lastOnline)));
                            
                            if(totalDiff > 0)
                                stat.totalTime = parseInt(stat.totalTime) + parseInt(totalDiff);

                        }
                    }   
                    
                    stat.lastOnline = dateTimeBody;
                    await stat.save();
                }
            }
        }

        const connection = await Connection.create({
            users: usersBody,
            dateTime: dateTimeBody
        });
        if(connection)
        {
            return res.status(StatusCodes.OK).json({
                success: true,
                connection: connection
            })
        }
        else
        {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false
            });
        }  
    }
    else 
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false
        });

}


module.exports = {postConnection, getLastConnection, getAllConnections};