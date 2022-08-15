//importer EXPRESS

// Importation
const express = require("express");
const dotenv = require("dotenv");
const result = dotenv.config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("./db/db.js");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

// Parcage des objets json
app.use(express.json());

//logger les requests et les responses
app.use(morgan("dev"));

// Paramétrage des en-têtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(bodyParser.json());

// Gestion des fichiers images
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

// Exportation
module.exports = app;
