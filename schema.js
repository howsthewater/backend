const graphql = require('graphql');
const {GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLList, GraphQLString, GraphQLInt} = graphql;


const Location = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        ID: {type: GraphQLID},
        DISTRICT: {type: GraphQLString},
        CountyNum: {type: GraphQLInt},
        COUNTY: {type: GraphQLString},
        NameMobileWeb: {type: GraphQLString},
        LocationMobileWeb: {type: GraphQLString},
        DescriptionMobileWeb: {type: GraphQLString},
        PHONE_NMBR: {type: GraphQLString},
        PARKING: {type: GraphQLString},
        DSABLDACSS: {type: GraphQLString},
        RESTROOMS: {type: GraphQLInt},
        VISTOR_CTR: {type: GraphQLString},
        DOG_FRIENDLY: {type: GraphQLString}, 
        EZ4STROLLERS: {type: GraphQLString},
        PCNC_AREA: {type: GraphQLString},
        CAMPGROUND: {type: GraphQLString},
        SNDY_BEACH: {type: GraphQLString},
        DUNES: {type: GraphQLString},
        RKY_SHORE: {type: GraphQLInt},
        BLUFF: {type: GraphQLString},
        STRS_BEACH: {type: GraphQLString},
        PTH_BEACH: {type: GraphQLString},
        BLFTP_TRLS: {type: GraphQLString},
        BLFTP_PRK: {type: GraphQLString},
        WLDLFE_VWG: {type: GraphQLString},
        TIDEPOOL: {type: GraphQLString},
        VOLLEYBALL: {type: GraphQLInt},
        FISHING: {type: GraphQLString},
        BOATING: {type: GraphQLString},
        LIST_ORDER: {type: GraphQLString},
        GEOGR_AREA: {type: GraphQLString},
        LATITUDE: {type: GraphQLFloat},
        LONGITUDE: {type: GraphQLFloat},
        Photo_1: {type: GraphQLString},
        Photo_2: {type: GraphQLString},
        Photo_3: {type: GraphQLString},
        Photo_4: {type: GraphQLString},
        Bch_whlchr: {type: GraphQLString},
        BIKE_PATH: {type: GraphQLString},
        BT_FACIL_TYPE: {type: GraphQLString},

    })

}) 


type User {
    username: {type: GraphQLString}! @unique
    password: {type: GraphQLString}!
    email: {type: GraphQLString}!
    joinDate: {type: GraphQLString}
    favorites: [Location]
}

