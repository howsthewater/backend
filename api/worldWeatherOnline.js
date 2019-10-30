const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = graphql;

// World Weather Online API



const WwoAPIType = new GraphQLObjectType({
  name: "WwoAPI",
  fields: () => ({
    request: { type: GraphQLList(RequestType) },
    weather: { type: GraphQLList(HourlyType) }    
  }),  
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
    temp_C: { type: GraphQLString },
    temp_F: { type: GraphQLString },
    weatherDesc: { type: new GraphQLList(WeatherDescType) }
  })
});

const WeatherDescType = new GraphQLObjectType({
  name: "weatherDesc",
  fields: () => ({
    value: { type: GraphQLString }
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
  name: "Hourly",
  fields: () => ({
    waterTemperature: {type: GraphQLString},
    swellHeight: {type: GraphQLString},
    windspeedMiles: { type: GraphQLString },
    windspeedKmph: { type: GraphQLString },
    winddir16Point: { type: GraphQLString },
    WindChillF: { type: GraphQLString },
    WindChillC: { type: GraphQLString }
  })
});

module.exports = {
  WwoAPIType
};