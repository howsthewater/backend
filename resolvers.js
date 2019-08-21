exports.resolvers = {
    Query: {
        getAllLocations: async (parent, args, { Location }) => {
            const Posts = await Location.find({});
            console.log(Posts);
            return Posts;
          }
        },

}
