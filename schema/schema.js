const graphql = require("graphql");
// const _ = require("lodash");
const User = require("../models/user.js");
const Location = require("../models/location.js");
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
  GraphQLInterfaceType
} = graphql;

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    ID: { type: GraphQLID },
    DISTRICT: { type: new GraphQLNonNull(GraphQLString) },
    CountyNum: { type: new GraphQLNonNull(GraphQLInt) },
    COUNTY: { type: new GraphQLNonNull(GraphQLString) },
    NameMobileWeb: { type: new GraphQLNonNull(GraphQLString) },
    LocationMobileWeb: { type: new GraphQLNonNull(GraphQLString) },
    DescriptionMobileWeb: { type: new GraphQLNonNull(GraphQLString) },
    PHONE_NMBR: { type: new GraphQLNonNull(GraphQLString) },
    PARKING: { type: new GraphQLNonNull(GraphQLString) },
    DSABLDACSS: { type: new GraphQLNonNull(GraphQLString) },
    RESTROOMS: { type: GraphQLString },
    VISTOR_CTR: { type: new GraphQLNonNull(GraphQLString) },
    DOG_FRIENDLY: { type: new GraphQLNonNull(GraphQLString) },
    EZ4STROLLERS: { type: new GraphQLNonNull(GraphQLString) },
    PCNC_AREA: { type: new GraphQLNonNull(GraphQLString) },
    CAMPGROUND: { type: new GraphQLNonNull(GraphQLString) },
    SNDY_BEACH: { type: new GraphQLNonNull(GraphQLString) },
    DUNES: { type: new GraphQLNonNull(GraphQLString) },
    RKY_SHORE: { type: new GraphQLNonNull(GraphQLString) },
    BLUFF: { type: new GraphQLNonNull(GraphQLString) },
    STRS_BEACH: { type: new GraphQLNonNull(GraphQLString) },
    PTH_BEACH: { type: new GraphQLNonNull(GraphQLString) },
    BLFTP_TRLS: { type: new GraphQLNonNull(GraphQLString) },
    BLFTP_PRK: { type: new GraphQLNonNull(GraphQLString) },
    WLDLFE_VWG: { type: new GraphQLNonNull(GraphQLString) },
    TIDEPOOL: { type: new GraphQLNonNull(GraphQLString) },
    VOLLEYBALL: { type: new GraphQLNonNull(GraphQLString) },
    FISHING: { type: new GraphQLNonNull(GraphQLString) },
    BOATING: { type: new GraphQLNonNull(GraphQLString) },
    LIST_ORDER: { type: new GraphQLNonNull(GraphQLString) },
    GEOGR_AREA: { type: new GraphQLNonNull(GraphQLString) },
    LATITUDE: { type: new GraphQLNonNull(GraphQLFloat) },
    LONGITUDE: { type: new GraphQLNonNull(GraphQLFloat) },
    REGION: { type: new GraphQLNonNull(GraphQLString) },
    Photo_1: { type: new GraphQLNonNull(GraphQLString) },
    Photo_2: { type: new GraphQLNonNull(GraphQLString) },
    Photo_3: { type: new GraphQLNonNull(GraphQLString) },
    Photo_4: { type: new GraphQLNonNull(GraphQLString) },
    Bch_whlchr: { type: new GraphQLNonNull(GraphQLString) },
    BIKE_PATH: { type: new GraphQLNonNull(GraphQLString) },
    BT_FACIL_TYPE: { type: new GraphQLNonNull(GraphQLString) },

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
          num_of_days: 1,
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
        const time = Math.floor(new Date() / 1000);
        console.log(time);

        const myURL = new URL(`https://api.stormglass.io/v1/weather/point`);
        const params = new URLSearchParams({
          lat: parent.LATITUDE,
          lng: parent.LONGITUDE,
          start: time,
          end: time,
          source: "sg",
          params: "waterTemperature,waveHeight,swellHeight"
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
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    }
  }
});

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
    update: {
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
            console.log(res);
            if (err) reject(err);
            else resolve(res);
          });
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
