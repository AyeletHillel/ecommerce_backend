//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")


////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////

const ProductsSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    price: Number
  }, {timestamps: true});
  
  const Products = mongoose.model("Products", ProductsSchema);

  module.exports = Products