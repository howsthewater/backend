const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Float = require("mongoose-float").loadType(mongoose);

const LocationSchema = new Schema({
  ID: {
    type: Number,
    required: false
  },
  DISTRICT: {
    type: String,
    required: false
  },
  CountyNum: {
    type: Number,
    required: false
  },
  COUNTY: {
    type: String,
    required: false
  },
  NameMobileWeb: {
    type: String,
    required: false
  },
  LocationMobileWeb: {
    type: String,
    required: false
  },
  DescriptionMobileWeb: {
    type: String,
    required: false
  },
  PHONE_NMBR: {
    type: String,
    required: false
  },
  FEE: {
    type: String,
    required: false
  },
  PARKING: {
    type: String,
    required: false
  },
  DSABLDACSS: {
    type: String,
    required: false
  },
  RESTROOMS: {
    type: Number,
    required: false
  },
  VISTOR_CTR: {
    type: String,
    required: false
  },
  DOG_FRIENDLY: {
    type: String,
    required: false
  },
  EZ4STROLLERS: {
    type: String,
    required: false
  },
  PCNC_AREA: {
    type: String,
    required: false
  },
  CAMPGROUND: {
    type: String,
    required: false
  },
  SNDY_BEACH: {
    type: String,
    required: false
  },
  DUNES: {
    type: String,
    required: false
  },
  RKY_SHORE: {
    type: Number,
    required: false
  },
  BLUFF: {
    type: String,
    required: false
  },
  STRS_BEACH: {
    type: String,
    required: false
  },
  PTH_BEACH: {
    type: String,
    required: false
  },
  BLFTP_TRLS: {
    type: String,
    required: false
  },
  BLFTP_PRK: {
    type: String,
    required: false
  },
  WLDLFE_VWG: {
    type: String,
    required: false
  },
  TIDEPOOL: {
    type: String,
    required: false
  },
  VOLLEYBALL: {
    type: String,
    required: false
  },
  FISHING: {
    type: String,
    required: false
  },
  BOATING: {
    type: String,
    required: false
  },
  LIST_ORDER: {
    type: String,
    required: false
  },
  GEOGR_AREA: {
    type: String,
    required: false
  },
  LATITUDE: {
    type: Float,
    required: false
  },
  LONGITUDE: {
    type: Float,
    required: false
  },
  Photo_1: {
    type: String,
    required: false
  },
  Photo_2: {
    type: String,
    required: false
  },
  Photo_3: {
    type: String,
    required: false
  },
  Photo_4: {
    type: String,
    required: false
  },
  Bch_whlchr: {
    type: String,
    required: false
  },
  BIKE_PATH: {
    type: String,
    required: false
  },
  BT_FACIL_TYPE: {
    type: String,
    required: false
  },
    REGION: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model("Location", LocationSchema);
