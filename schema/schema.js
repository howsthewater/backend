const graphql = require("graphql");
// const _ = require("lodash");
const User = require("../models/user.js");
const Location = require("../models/location.js");
const fetch = require("node-fetch");
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
  GraphQLFloat
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
    RESTROOMS: { type: new GraphQLNonNull(GraphQLString) },
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
    Photo_1: { type: new GraphQLNonNull(GraphQLString) },
    Photo_2: { type: new GraphQLNonNull(GraphQLString) },
    Photo_3: { type: new GraphQLNonNull(GraphQLString) },  
    Photo_4: { type: new GraphQLNonNull(GraphQLString) },
    Bch_whlchr: { type: new GraphQLNonNull(GraphQLString) },
    BIKE_PATH: { type: new GraphQLNonNull(GraphQLString) },
    BT_FACIL_TYPE: { type: new GraphQLNonNull(GraphQLString) },
    person: {
      type: PersonType,
      resolve (parent, args){
//        return fetch(`https://swapi.co/api/people/${parent.ID}/`)
         return fetch(
           `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=747d8c5349384e6497b03330191808&q= ${parent.LATITUDE}, ${parent.LONGITUDE}&format=json&num_of_days=1&fx=yes&moonrise=yes&tp=24`
         )
          .then(response => {
            console.log(response);
            return response.json();
          })
          .catch(error => console.log(error));
        
      }
    }
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     //        return _.find(authors, { id: parent.authorId });
    //     return Author.findById(parent.authorId);
    //   }
    // }
  })
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    data: { type: DataType }
  })
});

const DataType = new GraphQLObjectType({
  name: "Data",
  fields: () => ({
    request: { type: new GraphQLList(RequestType) },
    current_condition: { type: new GraphQLList(Current_ConditionType) },
    weather: { type: new GraphQLList(WeatherType) }
  })
});

const RequestType = new GraphQLObjectType({
  name: "Request",
  fields: () => ({
    type: { type: GraphQLString },
    query: { type: GraphQLString }
  })
});

const Current_ConditionType = new GraphQLObjectType({
  name: "Current_Condition",
  fields: () => ({
    observation_time: { type: GraphQLString },
    temp_C: { type: GraphQLString  },
    temp_F: { type: GraphQLString }
  })
});


const WeatherType = new GraphQLObjectType({
  name: "Weather",
  fields: () => ({
    date: { type: GraphQLString },
    astronomy: { type: new GraphQLList(AstronomyType) },
    hourly: { type: new GraphQLList(HourlyType) }
  })
});

const AstronomyType = new GraphQLObjectType({
  name: "Astronomy",
  fields: () => ({
    sunrise: { type: GraphQLString },
    sunset: { type: GraphQLString }
  })
});

const HourlyType = new GraphQLObjectType({
  name: "hourly",
  fields: () => ({
    windspeedMiles: { type: GraphQLString },
    windspeedKmph: { type: GraphQLString },
    WindChillF: { type: GraphQLString },
    WindChillC: { type: GraphQLString }
  })
});


const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    beachId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt }
    //    bookId: { type: new GraphQLNonNull(GraphQLString) },
    // locations: {
    //   type: new GraphQLList(locationType),
    //   resolve(parent, args) {
    //     //        return _.filter(books, { authorId: parent.id });
    //     return Location.find({ ID: parent.beachId });
    //   }
    // }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    location: {
      type: LocationType,
      args: { ID: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db or source
        //        return _.find(books, { id: args.id });
        return Location.findById(args.ID);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parant, args) {
        //        return _.find(authors, { id: args.id });
        return User.findById(args.id);
      }
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
        //        return books;
        return Location.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //        return authors;
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
        beachId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let user = new User({
          beachId: args.beachId,
          name: args.name,
          age: args.age
        });
        return user.save();
      }
    }
    // addBook: {
    //   type: BookType,
    //   args: {
    //     name: { type: new GraphQLNonNull(GraphQLString) },
    //     genre: { type: new GraphQLNonNull(GraphQLString) },
    //     authorId: { type: new GraphQLNonNull(GraphQLID) }
    //   },
    //   resolve(parent, args) {
    //     let book = new Book({
    //       name: args.name,
    //       genre: args.genre,
    //       authorId: args.authorId
    //     });
    //     return book.save();
    //   }
    // }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
