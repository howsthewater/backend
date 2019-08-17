exports.typeDefs = `

type Location {
    ID: Int
    DISTRICT: String
    CountyNum: Int
    COUNTY: String
    NameMobileWeb: String
    LocationMobileWeb: String
    DescriptionMobileWeb: String
    PHONE_NMBR: String
    PARKING: String
    DSABLDACSS: String
    RESTROOMS: Int
    VISTOR_CTR: String
    DOG_FRIENDLY: String
    EZ4STROLLERS: String
    PCNC_AREA: String
    CAMPGROUND: String
    SNDY_BEACH: String
    DUNES: String
    RKY_SHORE: Int
    BLUFF: String
    STRS_BEACH: String
    PTH_BEACH: String
    BLFTP_TRLS: String
    BLFTP_PRK: String
    WLDLFE_VWG: String
    TIDEPOOL: String
    VOLLEYBALL: Int
    FISHING: String
    BOATING: String
    LIST_ORDER: String
    GEOGR_AREA: String
    LATITUDE: Float
    LONGITUDE: Float
    Photo_1: String
    Photo_2: String
    Photo_3: String
    Photo_4: String
    Bch_whlchr: String
    BIKE_PATH: String
    BT_FACIL_TYPE: String
}



type User {
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Location]
}

type Query {
    getAllLocations: [Location]
}
`;
// type Mutation {
//     addRecipe(name: String!, description: String!, catagory: String!, instructions: String!, username: String): Recipe
// }

// type Recipe {
//     name: String!
//     catagory: String!
//     description: String!
//     instructions: String!
//     createdDate: String
//     likes: Int
//     username: String
// }

