const Users = require('../models/users');

const deleteUsers = async () => {
    const users = await Users.find();
    for(let i = 0; i < users.length; i++)
        await Users.findByIdAndDelete(users[i]._id);
}

module.exports = {deleteUsers}