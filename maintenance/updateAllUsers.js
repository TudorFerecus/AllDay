const Users = require('../models/users');

const updatePhotoUsers = async () => {
    const users = await Users.find();
    for(let i = 0; i < users.length; i++)
    {
        console.log("aaa");
        users[i].profilePhoto = "https://res.cloudinary.com/dhwmjfvyt/image/upload/v1704535323/lt4e6gg1sincep9kw2yj.jpg";
    }
}

module.exports = {updatePhotoUsers}