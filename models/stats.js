const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please specify user"],
    unique: [true, "There is already a stat for this user"]
  },
  lastOnline: {
    type: String,
    required: [true, "Please specify time"]
  },
  totalTime: {
    type: String,
    required: [true, "Please specify totalTime"]
  },
  tasksDone: {
type: [String],
    required: [true, "Please specify tasks ID"]
  },
  tasksPending: {
    type: [String],
    required: [true, "Please specify tasks pending"]
  }
});

module.exports = mongoose.model("Stats", StatsSchema);
