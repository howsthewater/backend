const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cognitoUserId: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  homeBeach: {
    type: Number,
    required: false
  },
  homeBeachName: {
    type: String,
    required: false,
    unique: false
  },
  longitude: {
    type: Number,
    required: false
  },
  latitude: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("User", UserSchema);
