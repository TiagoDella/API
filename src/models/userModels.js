const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  location: {
    address: String,
    number: Number,
    city: String,
    state: String,
  },
  //   historyBets: {
  //     id: String,
  //     value: number,
  //     date: String,
  //   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
