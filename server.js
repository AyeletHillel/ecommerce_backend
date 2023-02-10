///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();

// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, DATABASE_URL } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");

// import middlware
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// import models
const Products = require("./models/product.js");
const User = require("./models/user.js");

// import router
const ProductRouter = require("./controllers/product.js")
const AuthRouter = require("./controllers/auth.js")


///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(cookieParser()) // parse cookies
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false,
}))
app.use("/auth", AuthRouter) //auth
app.use("/products", ProductRouter) 


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

module.exports = User