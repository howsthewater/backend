exports.resolvers = {
    Query: {
        getAllLocations: async (parent, args, { Location }) => {
            const Posts = await Location.find({});
            console.log(Posts);
            return Posts;
          },
          getLocation: async (parent, args, {Location}) => {
            const location = await Location.find({ID: args.ID});
            console.log(location);
            return location;
          }
        },
    

}
