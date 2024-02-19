const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  dateEvent: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bets: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  coverPhoto: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
