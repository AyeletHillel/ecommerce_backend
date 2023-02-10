////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Products = require("../models/product.js")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
// router.get("/", (req, res) => {
//     res.send("hello world");
//   });

    // INDEX ROUTE
router.get("/", async (req, res) => {
    try {
      // send all products
      res.json(await Products.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });

  // Update ROUTE
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
      try {
        // send all people
        res.json(await Products.findByIdAndRemove(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });

  
  // CREATE ROUTE
router.post("/", async (req, res) => {
    try {
      res.json(await Products.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // SHOW ROUTE
router.get("/:id", async (req, res) => {
      try {
        res.json(await Products.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router