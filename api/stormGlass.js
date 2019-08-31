const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

// TideAPI - (also Stormglass API)

const TideAPIType = new GraphQLObjectType({
  name: "TideAPI",
  fields: () => ({
    extremes: { type: new GraphQLList(ExtremesType) },
    meta: { type: MetaType }
  })
});

const ExtremesType = new GraphQLObjectType({
  name: "Extremes",
  fields: () => ({
    height: { type: GraphQLString },
    timestamp: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const MetaType = new GraphQLObjectType({
  name: "Meta",
  fields: () => ({
    end: { type: GraphQLString },
    start: { type: GraphQLString }
  })
});

// Stormglass API

const StormAPIType = new GraphQLObjectType({
  name: "StormAPI",
  fields: () => ({
    hours: { type: new GraphQLList(HoursType) }
  })
});

const HoursType = new GraphQLObjectType({
  name: "Hours",
  fields: () => ({
    swellHeight: { type: new GraphQLList(swellHeightType) },
    waterTemperature: { type: new GraphQLList(waterTemperatureType) },
    waveHeight: { type: new GraphQLList(waveHeightType) }
  })
});

const swellHeightType = new GraphQLObjectType({
  name: "swellHeight",
  fields: () => ({
    source: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

const waterTemperatureType = new GraphQLObjectType({
  name: "waterTemperature",
  fields: () => ({
    source: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

const waveHeightType = new GraphQLObjectType({
  name: "waveHeight",
  fields: () => ({
    source: { type: GraphQLString },
    value: { type: GraphQLString }
  })
});

module.exports = {
  TideAPIType,
  StormAPIType
};