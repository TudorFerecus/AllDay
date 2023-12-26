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
  phone: {
    type: String,
    required: [true, "Please specify phoneNr"]
  },
  IP: {
    type: String,
    required: [true, "Please specify ipAddress"]
  },
  password: {
    type: String,
    required: [true, "Please specify password"]
  }
});

module.exports = mongoose.model("Users", UsersSchema);
