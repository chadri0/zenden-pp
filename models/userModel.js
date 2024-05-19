const mongoose = require("mongoose");
const passport = require("passport"); 

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;