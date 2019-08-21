const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

// connect to mongodb

mongoose.connect(
  "mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



// app.listen(4000, () => {
//   console.log("now listening for requests on port 4000");
// });
