const graphql = require('graphql');
const {GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLList, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;


exports.typeDefs =` 
    type Location{
        ID: ${GraphQLID},
        DISTRICT: ${GraphQLString},
        CountyNum: ${GraphQLInt},
        COUNTY:  ${GraphQLString},
        NameMobileWeb:  ${GraphQLString},
        LocationMobileWeb:  ${GraphQLString},
        DescriptionMobileWeb:  ${GraphQLString},
        PHONE_NMBR:  ${GraphQLString},
        PARKING:  ${GraphQLString},
        DSABLDACSS:  ${GraphQLString},
        RESTROOMS: ${GraphQLInt},
        VISTOR_CTR:  ${GraphQLString},
        DOG_FRIENDLY:  ${GraphQLString}, 
        EZ4STROLLERS:  ${GraphQLString},
        PCNC_AREA:  ${GraphQLString},
        CAMPGROUND:  ${GraphQLString},
        SNDY_BEACH:  ${GraphQLString},
        DUNES:  ${GraphQLString},
        RKY_SHORE: ${GraphQLInt},
        BLUFF:  ${GraphQLString},
        STRS_BEACH:  ${GraphQLString},
        PTH_BEACH:  ${GraphQLString},
        BLFTP_TRLS:  ${GraphQLString},
        BLFTP_PRK:  ${GraphQLString},
        WLDLFE_VWG:  ${GraphQLString},
        TIDEPOOL:  ${GraphQLString},
        VOLLEYBALL: ${GraphQLInt},
        FISHING:  ${GraphQLString},
        BOATING:  ${GraphQLString},
        LIST_ORDER:  ${GraphQLString},
        GEOGR_AREA:  ${GraphQLString},
        LATITUDE: ${GraphQLFloat},
        LONGITUDE: ${GraphQLFloat},
        Photo_1:  ${GraphQLString},
        Photo_2:  ${GraphQLString},
        Photo_3:  ${GraphQLString},
        Photo_4:  ${GraphQLString},
        Bch_whlchr:  ${GraphQLString},
        BIKE_PATH:  ${GraphQLString},
        BT_FACIL_TYPE:  ${GraphQLString},
}


type User{
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Location]
}



type Query {
    getLocation(ID: ID!): [Location],
    getAllLocations: [Location]
}

`
