////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user.js")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

///////////////////////////////
// ROUTES
////////////////////////////////
// // create a test route
// router.get("/", (req, res) => {
//     res.send("hello world");
//   });

// signup post
router.post("/signup", async (req, res) => {
    try {
        // encrypt password
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
        // create the new user
        res.json(await User.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      // checking if userexists
      if (!user) {
        res.send("user doesn't exist");
      } else {
        //check if password matches
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
          req.session.username = username
          req.session.loggedIn = true
          res.send("Logged In");
        } else {
          res.send("wrong password");
        }
      }
    });
  });

  router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.send("Logged Out")
    })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router