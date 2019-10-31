const graphql = require("graphql");
// const _ = require("lodash");
const User = require("../models/user.js");
const Location = require("../models/location.js");
const Ratings = require("../models/ratings.js");
const fetch = require("node-fetch");
const wwo = require("../api/worldWeatherOnline");
const sg = require("../api/stormGlass");
const hb = require("../api/homeBeach.js");
const url = require("url");

const {
  getGraphQLQueryArgs,
  getMongoDbQueryResolver,
  getGraphQLUpdateArgs,
  getMongoDbUpdateResolver,
  getGraphQLInsertType,
  getGraphQLFilterType,
  getMongoDbFilter
} = require("graphql-to-mongodb");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInterfaceType
} = graphql;

const ratingsType = new GraphQLObjectType({
  name: "Object",
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLInt },
    rating: { type: GraphQLInt }
  })
});

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    ID: { type: GraphQLID },
    DISTRICT: { type: GraphQLString },
    CountyNum: { type: GraphQLInt },
    COUNTY: { type: GraphQLString },
    NameMobileWeb: { type: GraphQLString },
    LocationMobileWeb: { type: GraphQLString },
    DescriptionMobileWeb: { type: GraphQLString },
    PHONE_NMBR: { type: GraphQLString },
    PARKING: { type: GraphQLString },
    DSABLDACSS: { type: GraphQLString },
    RESTROOMS: { type: GraphQLString },
    VISTOR_CTR: { type: GraphQLString },
    DOG_FRIENDLY: { type: GraphQLString },
    EZ4STROLLERS: { type: GraphQLString },
    PCNC_AREA: { type: GraphQLString },
    CAMPGROUND: { type: GraphQLString },
    SNDY_BEACH: { type: GraphQLString },
    DUNES: { type: GraphQLString },
    RKY_SHORE: { type: GraphQLString },
    BLUFF: { type: GraphQLString },
    STRS_BEACH: { type: GraphQLString },
    PTH_BEACH: { type: GraphQLString },
    BLFTP_TRLS: { type: GraphQLString },
    BLFTP_PRK: { type: GraphQLString },
    WLDLFE_VWG: { type: GraphQLString },
    TIDEPOOL: { type: GraphQLString },
    VOLLEYBALL: { type: GraphQLString },
    FISHING: { type: GraphQLString },
    BOATING: { type: GraphQLString },
    LIST_ORDER: { type: GraphQLString },
    GEOGR_AREA: { type: GraphQLString },
    LATITUDE: { type: GraphQLFloat },
    LONGITUDE: { type: GraphQLFloat },
    REGION: { type: GraphQLString },
    Photo_1: { type: GraphQLString },
    Photo_2: { type: GraphQLString },
    Photo_3: { type: GraphQLString },
    Photo_4: { type: GraphQLString },
    Bch_whlchr: { type: GraphQLString },
    BIKE_PATH: { type: GraphQLString },
    BT_FACIL_TYPE: { type: GraphQLString },
    Ratings: { type: ratingsType },

    WwoAPI: {
      type: wwo.WwoAPIType,
      resolve(parent, args) {
        const myURL = new URL(
          `http://api.worldweatheronline.com/premium/v1/weather.ashx`
        );
        const params = new URLSearchParams({
          key: process.env.WWO_API,
          q: ` ${parent.LATITUDE}, ${parent.LONGITUDE}`,
          format: "json",
          num_of_days: 10, // change this to more number of days
          fx: "yes",
          moonrise: "yes",
          tp: 24
        });
        myURL.search = params;

        return fetch(myURL.href)
          .then(response => {
            console.log(response);
            return response.json();
          })
          .catch(error => console.log(error));
      }
    },
    TideAPI: {
      type: sg.TideAPIType,
      resolve(parent, args) {
        const time = Math.floor(new Date() / 1000);
        console.log(time);
        const endTime = time + 40000;
        console.log(endTime);

        const myURL = new URL(
          `https://api.stormglass.io/v1/tide/extremes/point`
        );
        const params = new URLSearchParams({
          lat: parent.LATITUDE,
          lng: parent.LONGITUDE,
          start: time,
          end: endTime
        });
        myURL.search = params;

        return fetch(myURL.href, {
          headers: {
            Authorization: process.env.STORMGLASS_API
          }
        })
          .then(response => {
            console.log(response);
            return response.json();
          })
          .catch(error => console.log(error));
      }
    },
    StormAPI: {
      type: sg.StormAPIType,
      resolve(parent, args) {
        const currentDate = new Date();
        // Updated to get the information for 12 hours
        const time = Math.floor(
          (currentDate - 1000 * 60 * 60 * 24 * 0.5) / 1000
        );

        // Gets the current time
        const currtime = Math.floor(currentDate / 1000);
        console.log(
          "::STORM API TIME IS :: START TIME FOR STORM API is " + time
        );
        console.log(
          "::STORM API TIME IS :: CURRENT TIME FOR STORM API is " + currtime
        );

        const myURL = new URL(`https://api.stormglass.io/v1/weather/point`);
        const params = new URLSearchParams({
          lat: parent.LATITUDE,
          lng: parent.LONGITUDE,
          start: time, // Forecast time lines
          end: currtime,
          source: "sg",
          params: "waterTemperature,waveHeight,swellHeight,windSpeed"
        });
        myURL.search = params;

        return fetch(myURL.href, {
          headers: {
            Authorization: process.env.STORMGLASS_API
          }
        })
          .then(response => {
            console.log(response);
            return response.json();
          })
          .catch(error => console.log(error));
      }
    }
  })
});

// RatingsType

const RatingsType = new GraphQLObjectType({
  name: "Ratings",
  fields: () => ({
    Name: { type: GraphQLString },
    avgRating: { type: GraphQLFloat }
  })
});

// Future UserType for logged in user control

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    cognitoUserId: { type: GraphQLString },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    homeBeach: { type: GraphQLID },
    homeBeachName: { type: GraphQLString },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat },
    phoneInput: { type: GraphQLString },
    regionInput: { type: GraphQLString },
    beachInput: { type: GraphQLString },
    persona: { type: GraphQLString },
    favoriteBeach: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    location: {
      type: LocationType,
      args: { ID: { type: GraphQLID } },
      resolve(parent, args) {
        const result = Location.findById(args.ID);
      }
    },
    rating: {
      type: RatingsType,
      args: { Name: { type: GraphQLString } },
      resolve(parent, args) {
        return Ratings.findOne({ Name: args.Name });
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    filterUser: {
      type: new GraphQLList(UserType),
      args: getGraphQLQueryArgs(UserType),
      resolve: getMongoDbQueryResolver(
        UserType,
        async (filter, projection, options, source, args, context) => {
          return await User.find(filter, projection, options);
        }
      )
    },
    filter: {
      type: new GraphQLList(LocationType),
      args: getGraphQLQueryArgs(LocationType),
      resolve: getMongoDbQueryResolver(
        LocationType,
        async (filter, projection, options, source, args, context) => {
          return await Location.find(filter, projection, options);
        }
      )
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parent, args) {
        return Location.find({});
      }
    },
    rate: {
      type: new GraphQLList(RatingsType),
      resolve(parent, args) {
        return Ratings.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

// const ratingsTypeMut = new GraphQLInputObjectType({
//   name: "beachRatings",
//   fields: () => ({
//     _id: { type: GraphQLID },
//     user: { type: GraphQLInt },
//     rating: { type: GraphQLInt }
//   })
// });

// const favbeachTypeMut = new GraphQLInputObjectType({
//   name: "beachRatings",
//   fields: () => ({
//     name: { type: GraphQLID }
//   })
// });

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        cognitoUserId: { type: new GraphQLNonNull(GraphQLString) },
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        homeBeach: { type: GraphQLID },
        homeBeachName: { type: GraphQLString },
        longitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat },
        phoneInput: { type: GraphQLString },
        regionInput: { type: GraphQLString },
        beachInput: { type: GraphQLString },
        persona: { type: GraphQLString },
        favoriteBeach: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let user = new User({
          cognitoUserId: args.cognitoUserId,
          fullName: args.fullName,
          email: args.email,
          homeBeach: args.homeBeach,
          homeBeachName: args.homeBeachName,
          longitude: args.longitude,
          latitude: args.latitude,
          phoneInput: args.phoneInput,
          regionInput: args.regionInput,
          beachInput: args.beachInput,
          persona: args.persona,
          favoriteBeach: args.favoriteBeach
        });

        let mUser = await hb(user);
        let newUser = new User(mUser);
        return newUser.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        cognitoUserId: { type: new GraphQLNonNull(GraphQLString) },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        homeBeach: { type: GraphQLID },
        homeBeachName: { type: GraphQLString },
        longitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat },
        phoneInput: { type: GraphQLString },
        regionInput: { type: GraphQLString },
        beachInput: { type: GraphQLString },
        persona: { type: GraphQLString },
        favoriteBeach: { type: GraphQLString }
      },
      resolve(root, args) {
        console.log(
          "SCHEMA :: USER UPDATE :: ARGS ARE :: " + JSON.stringify(args)
        );
        return new Promise((resolve, reject) => {
          User.findOneAndUpdate(
            {
              cognitoUserId: args.cognitoUserId
            },
            args,
            {
              new: true,
              useFindAndModify: false
            }
          ).exec((err, res) => {
            console.log(" SCHEMA:: USER UPDATE:: RESPONSE IS ::  " + res);
            if (err) reject(err);
            else resolve(res);
          });
        });
      }
    }
    // updateBeach: {
    //   type: LocationType,
    //   args: {
    //     ID: { type: GraphQLID },
    //     DISTRICT: { type: GraphQLString },
    //     CountyNum: { type: GraphQLInt },
    //     COUNTY: { type: GraphQLString },
    //     NameMobileWeb: { type: GraphQLString },
    //     LocationMobileWeb: { type: GraphQLString },
    //     DescriptionMobileWeb: { type: GraphQLString },
    //     PHONE_NMBR: { type: GraphQLString },
    //     PARKING: { type: GraphQLString },
    //     DSABLDACSS: { type: GraphQLString },
    //     RESTROOMS: { type: GraphQLString },
    //     VISTOR_CTR: { type: GraphQLString },
    //     DOG_FRIENDLY: { type: GraphQLString },
    //     EZ4STROLLERS: { type: GraphQLString },
    //     PCNC_AREA: { type: GraphQLString },
    //     CAMPGROUND: { type: GraphQLString },
    //     SNDY_BEACH: { type: GraphQLString },
    //     DUNES: { type: GraphQLString },
    //     RKY_SHORE: { type: GraphQLString },
    //     BLUFF: { type: GraphQLString },
    //     STRS_BEACH: { type: GraphQLString },
    //     PTH_BEACH: { type: GraphQLString },
    //     BLFTP_TRLS: { type: GraphQLString },
    //     BLFTP_PRK: { type: GraphQLString },
    //     WLDLFE_VWG: { type: GraphQLString },
    //     TIDEPOOL: { type: GraphQLString },
    //     VOLLEYBALL: { type: GraphQLString },
    //     FISHING: { type: GraphQLString },
    //     BOATING: { type: GraphQLString },
    //     LIST_ORDER: { type: GraphQLString },
    //     GEOGR_AREA: { type: GraphQLString },
    //     LATITUDE: { type: GraphQLFloat },
    //     LONGITUDE: { type: GraphQLFloat },
    //     REGION: { type: GraphQLString },
    //     Photo_1: { type: GraphQLString },
    //     Photo_2: { type: GraphQLString },
    //     Photo_3: { type: GraphQLString },
    //     Photo_4: { type: GraphQLString },
    //     Bch_whlchr: { type: GraphQLString },
    //     BIKE_PATH: { type: GraphQLString },
    //     BT_FACIL_TYPE: { type: GraphQLString }
    //     //        Ratings: { type: ratingsTypeMut }
    //   },
    //   resolve(root, args) {
    //     return new Promise((resolve, reject) => {
    //       User.findOneAndUpdate(
    //         {
    //           NameMobileWeb: args.NameMobileWeb
    //         },
    //         args,
    //         {
    //           new: true,
    //           useFindAndModify: false
    //         }
    //       ).exec((err, res) => {
    //         console.log(res);
    //         if (err) reject(err);
    //         else resolve(res);
    //       });
    //     });
    //   }
    // }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
