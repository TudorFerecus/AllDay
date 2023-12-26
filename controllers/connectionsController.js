const Connection = require('../models/connection.js');
const { StatusCodes } = require('http-status-codes');

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

    if(usersBody && dateTimeBody)
    {
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