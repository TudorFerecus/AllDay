const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model("Users", UsersSchema);
