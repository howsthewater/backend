

// The GraphQL schema in string form
const typeDefs = `
type Surfer {
	id: ID!
	info: Person
}
type Person {
	name: String!
	age: Int
    gender: String
    beach: String
}
type Query {
  getSurfers: [Surfer]
  retrieveSurfer(id: ID!): Surfer
}
type DeleteMessage {
  id: ID!,
  message: String
}
type Mutation {
  createSurfer(name: String!, age: Int, gender: String!, beach: String!) : Surfer
  updateSurfer(id: ID!, name: String, gender: String, age: Int): Surfer
  deleteSurfer(id:ID!): DeleteMessage
}
`;

module.exports = typeDefs;

