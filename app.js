const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

// connect to mongodb

mongoose.connect(process.env.MONGO_API, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

const cors = require("cors");
const app = express();

app.use(cors());

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
