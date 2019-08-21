
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  beachId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("User", UserSchema);