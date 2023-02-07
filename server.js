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
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const AuthController = require("./controllers/auth.js")


///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
.on("open", () => console.log("Your are connected to mongoose"))
.on("close", () => console.log("Your are disconnected from mongoose"))
.on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////

// Products
const ProductsSchema = new mongoose.Schema({
  name: String,
  image: String,
  desc: String,
  price: Number
}, {timestamps: true});

const Products = mongoose.model("Products", ProductsSchema);

// User
const UserSchema = new mongoose.Schema({
  username: {type: String, require: true, unique: true},
  password: {type: String, require: true}
  
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(cookieParser()) // parse cookies
app.use("/auth", AuthController) //auth

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Update ROUTE
app.put("/products/:id", async (req, res) => {
    try {
      res.json(
        await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // Delete ROUTE
  app.delete("/products/:id", async (req, res) => {
    try {
      // send all people
      res.json(await Products.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

// INDEX ROUTE
app.get("/products", async (req, res) => {
  try {
    // send all products
    res.json(await Products.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/products", async (req, res) => {
  try {
    res.json(await Products.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// SHOW ROUTE
app.get("/products/:id", async (req, res) => {
    try {
      res.json(await Products.findById(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

module.exports = User