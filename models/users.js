const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please specify name"]
  },
  mail: {
    type: String,
    required: [true, "Please specify email"]
  },
  IP: {
    type: String,
    required: [true, "Please specify ipAddress"]
  },
  password: {
    type: String,
    required: [true, "Please specify password"]
  },
  profilePhoto: {
    type: String
  }
});

module.exports = mongoose.model("Users", UsersSchema);
