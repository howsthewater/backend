const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.js');
const resolvers = require('./resolver.js')


const PORT = 3600;

// Put together a schema
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ 
  app,
  path: '/graphql'
});


app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
