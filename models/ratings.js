const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Float = require("mongoose-float").loadType(mongoose);

const RatingsSchema = new Schema({
  Name: {
    type: String,
    required: false
  },
  avgRating: {
    type: Float,
    required: false
  }
});

module.exports = mongoose.model("Ratings", RatingsSchema);
