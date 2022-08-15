//
const dotenv = require("dotenv").config();

//importer mongoose pour se connecter à la base de donnée mongo DB
const mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.m0cciop.mongodb.net/p6Api`;

mongoose
  .connect(uri)

  .then(() => console.log("connexion à mongoDB a reussi"))
  .catch(() => console.error("connexion à mongoDB a échoué"));

module.exports = mongoose;
