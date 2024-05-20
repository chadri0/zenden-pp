const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: Buffer,
  },
  salt: {
      type: Buffer,
  },
  strategy: {
      type: String,
      required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;