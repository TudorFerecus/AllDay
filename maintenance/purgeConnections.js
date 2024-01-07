const Connection = require('../models/connection');

const deleteConnections = async () => {
    const connection = await Connection.find();
    for(let i = 0; i < connection.length; i++)
        await Connection.findByIdAndDelete(connection[i]._id);

    console.log("Connections Purged!")
}

module.exports = {deleteConnections}