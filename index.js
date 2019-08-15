require("dotenv").config();
//
const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Server Running<h1>");
});

const PORT = process.env.PORT || 9700;
server.listen(PORT, () => console.log("API RUnning..."));
module.exports = server;
