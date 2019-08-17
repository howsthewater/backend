exports.resolvers = {
    Query: {
        getAllLocations: async (parent, args, { Location }) => {
            const Posts = await Location.find({});
            console.log(Posts);
            return Posts;
          }
        },

    Mutation: {
        addRecipe: async (root, { name, description, catagory, instructions, username }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                catagory,
                instructions,
                username
            }).save();
            return newRecipe;
        }
    }
}
